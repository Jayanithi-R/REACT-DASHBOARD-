<?php
header("Access-Control-Allow-Origin: *"); // allow all origins (for development)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// DB connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "hrdashboard";
$port = 3307;

$conn = new mysqli($host, $user, $pass, $db,$port);
if ($conn->connect_error) {
  die(json_encode(["error" => "Database connection failed"]));
}

// Current date (you can change or pass via GET)
$date = date("Y-m-d");

// Query to join attendance + employee details
$sql = "
  SELECT 
    e.id,
    e.name,
    e.role,
    e.avatar,
    a.status,
    a.time_in
  FROM attendance a
  JOIN employees e ON a.employee_id = e.id
  WHERE a.date = '$date'
";

$result = $conn->query($sql);

$absent = [];
$present = [];

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    if ($row['status'] === 'Present') {
      $present[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "role" => $row["role"],
        "avatar" => $row["avatar"],
        "time" => $row["time_in"]
      ];
    } else {
      $absent[] = [
        "id" => $row["id"],
        "name" => $row["name"],
        "role" => $row["role"],
        "avatar" => $row["avatar"],
        "status" => $row["status"]
      ];
    }
  }
}

$conn->close();

echo json_encode([
  "absent" => $absent,
  "present" => $present
]);
?>
