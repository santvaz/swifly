import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function WrappedBreadcrumb({ href, name, children }) {
    return (
        <>
            <div
                className="breadcrumbs max-w-[91%] w-full p-4 mt-24 bg-white rounded-lg border border-gray-300 justify-start items-start xl:max-w-7xl"
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
