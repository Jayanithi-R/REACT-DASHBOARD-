'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export function Schedule({ selectedDate, onDateChange, activeTab, onTabChange, meetings, events }) {
    const renderItems = (items) => {
        if (!items || items.length === 0) {
            return <p className="text-sm text-gray-500 text-center py-4">No {activeTab.toLowerCase()} scheduled for this date.</p>;
        }

        return items.map((item, index) => (
            <div key={index} className="border p-2 rounded-lg">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{item.title}</h4>
                    <span className="text-sm text-gray-500">{item.time}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex -space-x-2">
                        {item.avatars.map((avatar, i) => (
                            <img key={i} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={avatar} alt="" />
                        ))}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${item.team === 'Product Team' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{item.team}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.location}</p>
            </div>
        ));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateChange}
                    className="rounded-md border"
                />
                <div className="mt-4 space-y-4">
                    <div className="flex justify-around items-center bg-gray-100 rounded-lg p-1">
                        <Button variant={activeTab === 'Meetings' ? 'secondary' : 'ghost'} onClick={() => onTabChange('Meetings')} className="flex-1">Meetings</Button>
                        <Button variant={activeTab === 'Events' ? 'secondary' : 'ghost'} onClick={() => onTabChange('Events')} className="flex-1">Events</Button>
                    </div>
                    <div className="space-y-2">
                        {activeTab === 'Meetings' ? renderItems(meetings) : renderItems(events)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}