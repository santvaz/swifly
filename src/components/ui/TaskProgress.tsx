import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Component() {
    return (
        <Card className="w-full">
            <CardHeader className="flex items-center justify-between">
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm text-gray-500  mb-2">Tareas completadas</div>
                        <Progress value={33} />
                        <div className="text-right text-sm font-medium">33%</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 mb-2">Tareas pendientes</div>
                        <Progress value={67} />
                        <div className="text-right text-sm font-medium">67%</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
