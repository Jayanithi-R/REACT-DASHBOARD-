'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const interns = [
    { id: 1, name: 'Viola Williamson', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 2, name: 'Gordon Paucek', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 3, name: 'Nora Kreiger', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 4, name: 'Amber Wolf', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 5, name: 'Alonzo Sauer', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 6, name: 'Bobby Gibson', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 7, name: 'Yvonne Hartmann', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 8, name: 'Russell Bartell', avatar: 'https://i.pravatar.cc/150?img=7' },
];

export function Internship() {
  const totalInterns = interns.length;
  const attendedCount = 8;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Internship</CardTitle>
        <Button variant="link" size="sm">Details</Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Total Intern</p>
          <p className="text-2xl font-bold">{totalInterns} Intern</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="flex -space-x-2 mr-2">
                    {interns.slice(0, 3).map((intern) => (
                        <Avatar key={intern.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={intern.avatar} alt={intern.name} />
                            <AvatarFallback>{intern.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">{attendedCount} Attended</span>
            </div>
          <Button>View Progress</Button>
        </div>
      </CardContent>
    </Card>
  );
}
