import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
    return (
        <div className="w-full mx-auto p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-light">Próximamente</h2>
                <Button variant="outline" className="flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Agregar evento
                </Button>
            </div>
            <div className="flex flex-col gap-3">
                <Card className="shadow-md bg-grape-50 border border-grape-300">
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div className="text-lg font-medium text-grape-900">Presentación trabajo de fin de ciclo</div>
                            <div className="text-gray-700">Junio 10, 2024</div>
                        </div>
                        <div className="text-gray-700">15:00 PM - 9:30 PM</div>
                    </CardContent>
                </Card>
                <Card className="shadow-md bg-grape-50 border border-grape-300">
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div className="text-lg font-medium text-grape-900">Completar mis tareas del proyecto de Laura</div>
                            <div className="text-gray-700">Junio 17, 2024</div>
                        </div>
                        <div className="text-gray-700">08:00 AM - 2:30 PM</div>
                    </CardContent>
                </Card>
                <Card className="shadow-md bg-grape-50 border border-grape-300">
                    <CardContent>
                        <div className="flex items-center justify-between py-4">
                            <div className="text-lg font-medium text-grape-900">Fin de prácticas</div>
                            <div className="text-gray-700">Junio 24, 2024</div>
                        </div>
                        <div className="text-gray-700">12:00 PM - 1:30 PM</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}