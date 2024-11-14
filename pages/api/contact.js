import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      message: "405: method is not allowed. Please make a POST request",
    });
  //   const contactData = {
  //     fullName: "Jinny",
  //     email: "jinny@test.com",
  //     subject: "booking",
  //     message: "Hai",
  //   };
  const contactData = JSON.parse(req.body);
  const { error } = await supabase.from("contact").insert([contactData]);
  if (error)
    return res.status(500).json({
      success: false,
      message: "Could not send your message, please try again",
    });

  res.status(200).json({
    success: true,
    message: "Thanks for your message! We will be in touch soon:)",
  });
}
