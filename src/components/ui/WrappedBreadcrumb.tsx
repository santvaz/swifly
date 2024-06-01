import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { color } from "framer-motion";

export default function WrappedBreadcrumb({ href, name, children }) {
    return (
        <>
            <div
                className="breadcrumbs p-4 mt-24 w-full bg-white rounded-lg border border-gray-300 justify-start items-start max-w-7xl"
            >
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {children}
                    </BreadcrumbList>
                </Breadcrumb>

            </div>
        </>
    );
}
