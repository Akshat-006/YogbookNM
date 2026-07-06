import { ClassDetails } from "@/features/classes/components/ClassDetails";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({
    params,
}: Props) {

    const { id } = await params;

    return <ClassDetails id={id} />;
}