export const revalidate = 0; // Disable caching

import { query } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { id } = params;

    try {
        const articleId = parseInt(id, 10);
        if (isNaN(articleId)) {
            return NextResponse.json(
                { success: false, message: "Invalid article ID" },
                { status: 400 }
            );
        }

        const articleResult = await query(
            `
            SELECT 
                a.*, 
                p.email, 
                p.name, 
                p.photo, 
                p.bio, 
                p.degree, 
                p.university, 
                p.linkedin, 
                p.lablink,
                (SELECT COUNT(*) FROM article_likes al WHERE al.article_id = a.id) AS like_count
            FROM article a
            LEFT JOIN profile p ON (a.certifiedby->>'userId')::INTEGER = p.user_id
            WHERE a.id = $1
            `,
            [articleId]
        );

        if (articleResult.rows.length > 0) {
            return NextResponse.json(articleResult.rows[0]);
        }

        return NextResponse.json(
            { success: false, message: "Article not found" },
            { status: 404 }
        );

    } catch (error) {
        console.error("Error fetching article:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching article" },
            { status: 500 }
        );
    }
}

// =========================
//  PATCH — UPDATE IMAGE_URL
// =========================
export async function PATCH(request, { params }) {
    const { id } = params;

    try {
        const body = await request.json();
        const { imageUrl } = body;

        if (!imageUrl) {
            return NextResponse.json(
                { success: false, message: "No imageUrl provided" },
                { status: 400 }
            );
        }

        const articleId = parseInt(id, 10);
        if (isNaN(articleId)) {
            return NextResponse.json(
                { success: false, message: "Invalid article ID" },
                { status: 400 }
            );
        }

        // Update image_url
        const updateResult = await query(
            `
            UPDATE article
            SET image_url = $1
            WHERE id = $2
            RETURNING *
            `,
            [imageUrl, articleId]
        );

        return NextResponse.json({
            success: true,
            article: updateResult.rows[0],
        });

    } catch (error) {
        console.error("PATCH error updating article image:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update article image" },
            { status: 500 }
        );
    }
}