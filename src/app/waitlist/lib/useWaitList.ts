import { useState } from "react";
import { NotificationService } from "@/shared/lib/NotificationService";
import { isValidEmail } from "./isValidMail";

export const useWaitlist = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      NotificationService.error("Please enter a valid email address.");
      return;
    }

    try {
      // NotificationService.loading("Sending...");

      const formData = new FormData();
      formData.append("email", trimmed);

      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxkQby8o3xiobpz4gK6q8wC0KXnX7nWTzuQun8o_Bdan7ZrSQ_ulo0_L2rsFGYU5ZZAqg/exec",
        {
          method: "POST",
          body: formData,
        }
      );
    } catch (error) {
      console.error(error);
      NotificationService.dismiss();
    }

    try {
      NotificationService.loading("Sending...");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();
      NotificationService.dismiss();

      if (res.ok) {
        NotificationService.success("You’ve successfully subscribed! 🎉");
        setEmail("");
      } else {
        NotificationService.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      NotificationService.dismiss();
      NotificationService.error("Network error. Please try again later.");
    }
  };

  return { email, setEmail, handleSubmit };
};

// import { useState } from "react";

// import { NotificationService } from "@/shared/lib/NotificationService";
// import { isValidEmail } from "./isValidMail";

// export const useWaitlist = () => {
//   const [email, setEmail] = useState("");

//   // const handleSubmit = async () => {
//   //   const trimmed = email.trim();

//   //   if (!isValidEmail(trimmed)) {
//   //     NotificationService.error("Please enter a valid email address.");
//   //     return;
//   //   }

//   //   try {
//   //     NotificationService.loading("Sending...");

//   //     const res = await fetch("/api/subscribe", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ email: trimmed }),
//   //     });

//   //     const data = await res.json();
//   //     NotificationService.dismiss();

//   //     if (res.ok) {
//   //       NotificationService.success("You’ve successfully subscribed! 🎉");
//   //       setEmail("");
//   //     } else {
//   //       NotificationService.error(data.message || "Something went wrong.");
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     NotificationService.dismiss();
//   //     NotificationService.error("Network error. Please try again later.");
//   //   }
//   // };

//   const handleSubmit = async () => {
//     const trimmed = email.trim();

//     if (!isValidEmail(trimmed)) {
//       NotificationService.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       NotificationService.loading("Sending...");

//       const formData = new FormData();
//       formData.append("email", trimmed);

//       const res = await fetch(
//         "https://script.google.com/macros/s/AKfycbyXqHGKopz-ld446e7iWEw_TNKLGDVbfrUer4aJ9MCil7D5mWVsQMSWqHCYONc94to6wg/exec",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       NotificationService.dismiss();

//       if (res.ok) {
//         NotificationService.success("You’ve successfully subscribed! 🎉");
//         setEmail("");
//       } else {
//         NotificationService.error("Something went wrong.");
//       }
//     } catch (error) {
//       console.error(error);
//       NotificationService.dismiss();
//       NotificationService.error("Network error. Please try again later.");
//     }
//   };

//   return { email, setEmail, handleSubmit };
// };
