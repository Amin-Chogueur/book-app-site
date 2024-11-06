import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { formData, orderData } = body;

  try {
    // Calculate total quantity and total price for all books
    const totalQuantity = orderData.reduce(
      (sum: number, entry: { item: { quantity: number } }) =>
        sum + entry.item.quantity,
      0
    );
    const totalPrice = orderData.reduce(
      (
        sum: number,
        entry: { item: { quantity: number }; book: { price: number } }
      ) => sum + entry.item.quantity * Number(entry.book.price),
      0
    );

    // Construct the cart items section for each book
    const cartItemsHtml = orderData
      .map(
        (entry: {
          item: { quantity: number };
          book: { title: string; auther: string; price: string };
        }) => {
          const itemTotalPrice = entry.item.quantity * Number(entry.book.price);
          return `
              <p><strong>Title:</strong> ${entry.book.title}</p>
              <p><strong>Author:</strong> ${entry.book.auther}</p>
              <p><strong>Quantity:</strong> ${entry.item.quantity}</p>
              <p><strong>Price per Unit:</strong> ${entry.book.price} DA</p>
              <p><strong>Total for this Item:</strong> ${itemTotalPrice} DA</p>
              <hr />
            `;
        }
      )
      .join("");

    // Construct the full email content
    const emailHtml = `
        <h3>Order Details</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.adress}</p>
        <h3>Cart Items:</h3>
        ${cartItemsHtml}
        <p><strong>Total Quantity of Books:</strong> ${totalQuantity}</p>
        <p><strong>Total Price for All Books:</strong> ${totalPrice} DA</p>
      `;

    // Send email
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "chogueuramine@gmail.com",
      subject: "Message from Book App Store",
      html: emailHtml,
    });

    return NextResponse.json({ status: "Email sent successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "Email sending failed", error: error.message },
      { status: 500 }
    );
  }
}
