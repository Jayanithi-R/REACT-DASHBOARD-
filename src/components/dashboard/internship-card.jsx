import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Briefcase, Users, ChevronRight } from "lucide-react";

export function InternshipCard() {
    const avatars = [
        PlaceHolderImages.find(img => img.id === 'emp1'),
        PlaceHolderImages.find(img => img.id === 'emp2'),
        PlaceHolderImages.find(img => img.id === 'emp3'),
    ];

    return (
        <Card className="h-90">
            <CardHeader className="flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">Internship</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 rounded-full">
                    Details
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-xs text-muted-foreground">Total Intern</p>
                    <p className="text-2xl font-bold">8 Intern</p>
                </div>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="flex -space-x-2 overflow-hidden">
                        {avatars.map((avatar, i) => (
                            <Avatar key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background">
                                <AvatarImage src={avatar?.imageUrl} alt={avatar?.description} />
                                <AvatarFallback>{avatar?.description[0]}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">8 Attended</p>
                   </div>
                    <Button>View Progress</Button>
                </div>
            </CardContent>
        </Card>
    );
}
