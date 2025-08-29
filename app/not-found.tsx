// import css from "./not-found.module.css";

// export default function NotFoundPage() {
//   return (
//     <div>
//       <h1 className={css.title}>404 - Page not found</h1>
//       <p className={css.description}>
//         Sorry, the page you are looking for does not exist.
//       </p>
//     </div>
//   );
// }

import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 – Сторінка не знайдена | NoteHub",
  description: "На жаль, сторінку, яку ви шукаєте, не знайдено.",
  robots: {
    index: false, // ❌ забороняємо індексацію
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
