'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Internship() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Internship</CardTitle>
        <Button variant="outline" size="sm">Details</Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Intern</p>
            <p className="text-2xl font-bold">8 Intern</p>
          </div>
          <div className="flex -space-x-2">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/avatars/07.png" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/avatars/08.png" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="/avatars/09.png" alt="" />
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 ring-2 ring-white">+5</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">8 Attended</span>
            <Button>View Progress</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}