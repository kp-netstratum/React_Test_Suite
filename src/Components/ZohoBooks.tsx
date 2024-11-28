// import { useState } from "react";

export const ZohoBooks = () => {

    // const [itemId, setItemId] = useState(0);


    
    

    const handleZohoInvoice = () => {
    
        // Replace with your Zoho Books organization ID
        const organization_id = "686143402";

        const options = {
            method: 'GET',
            headers: {
              'Authorization': 'Zoho-oauthtoken 1000.1a63341f69eef575dc8a31a244d159db.a68e1ae772d030d6163a053e4672ddd3',
              'Access-Control-Allow-Origin': '*',
            //   'Content-Type': 'application/json'

            }
          };

          fetch(`https://www.zohoapis.com/books/v3/items/45667789900?organization_id=${organization_id}`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
            })
            .catch(err => console.error(err));


    // Loop through each customer and calculate the total amount
    // for each customer in customers {
    //     usage = customer.get("usage");
    //     total_amount = usage * 0.05; // Calculate total based on usage and rate
    //     if (total_amount > 0) {
    //         // Create invoice data
    //         line_item = map();
    //         line_item.put("item_id", item_id); // Scrub Tool item ID
    //         line_item.put("quantity", usage); // Number of units (usage)
    //         line_item.put("rate", 0.05); // Price per unit

    //         invoice_data = map();
    //         invoice_data.put("customer_id", customer.get("customer_id"));
    //         invoice_data.put("line_items", list(line_item));
    //         invoice_data.put("notes", "Invoice for tool usage");

    //         // Create the invoice
    //         response = zoho.books.createRecord("invoices", organization_id, invoice_data);
    //         if (response.get("code") == 0) {
    //             info "Invoice created successfully for customer: " + customer.get("customer_id");
    //         } else {
    //             info "Failed to create invoice for customer: " + customer.get("customer_id") + ". Error: " + response.toString();
    //         }
    //     }
    // }
    }


    return (
        <div className="flex flex-col justify-center items-center h-[100vh] w-full gap-5">
            <h1 className="text-3xl font-bold">Zoho Books</h1>
            <div
            onClick={
                () => {handleZohoInvoice()}
            }
            >fetch data</div>
        </div>
    );
};