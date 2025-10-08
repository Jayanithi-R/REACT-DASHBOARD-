'use client';

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function CreateTaskButton() {
  return (
    <Button>
      <PlusIcon className="mr-2 h-4 w-4" />
      Create Task
    </Button>
  );
}