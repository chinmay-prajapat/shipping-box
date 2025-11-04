import { Box } from "@/data/domain/entities/Box";
import { NextRequest, NextResponse } from "next/server";

const boxesStore: Box[] = [];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export async function GET() {
  try {
    return NextResponse.json(boxesStore);
  } catch (error) {
    console.error("Error fetching boxes:", error);
    return NextResponse.json(
      { error: "Failed to fetch boxes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (
      !body.receiverName ||
      !body.weight ||
      !body.boxColor ||
      !body.destinationCountry
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const box: Box = {
      id: generateId(),
      receiverName: body.receiverName,
      weight: Math.max(0, body.weight), // Ensure non-negative
      boxColor: body.boxColor,
      destinationCountry: body.destinationCountry,
      shippingCost: body.shippingCost,
    };

    boxesStore.push(box);

    return NextResponse.json(box, { status: 201 });
  } catch (error) {
    console.error("Error creating box:", error);
    return NextResponse.json(
      { error: "Failed to create box" },
      { status: 500 }
    );
  }
}
