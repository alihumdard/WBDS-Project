import { NextResponse } from "next/server";
import path from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export async function GET(request, { params }) {
    try {
        const { filename } = await params;
        

        const safeFilename = path.basename(filename);
        const filepath = path.join(process.cwd(), "uploads", safeFilename);

        if (!existsSync(filepath)) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const buffer = await readFile(filepath);
        

        let contentType = "image/jpeg";
        const ext = path.extname(safeFilename).toLowerCase();
        if (ext === ".png") contentType = "image/png";
        else if (ext === ".webp") contentType = "image/webp";
        else if (ext === ".gif") contentType = "image/gif";
        else if (ext === ".svg") contentType = "image/svg+xml";

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving uploaded file:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
