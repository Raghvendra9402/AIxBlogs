import { auth } from "@/auth";

const session = await auth();
export const userId = session?.user?.id;
