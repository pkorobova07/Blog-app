// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { getPostById } from "@/lib/posts";

// interface PostPageProps {
//   params: Promise<{ postId: string }>;
// }

// export default async function PostPage({ params }: PostPageProps) {
//   const { postId } = await params;

//   const post = await getPostById(postId);

//   if (!post) {
//     notFound();
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Link
//         href="/"
//         className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
//       >
//         <svg
//           className="w-5 h-5 mr-2"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M10 19l-7-7m0 0l7-7m-7 7h18"
//           />
//         </svg>
//         Назад ко всем постам
//       </Link>

//       {/* Заголовок поста */}
//       <h1 className="">
//         {post.title}
//       </h1>

//       {/* Автор */}
//       <div className="">
//         <div>
//           <p className="">@{post.author_username}</p>
//         </div>
//       </div>

//       {/* Текст поста */}
//       <article className="">
//         <div className="">
//           {post.content.split("\n").map((paragraph, index) => (
//             <p key={index} className="">
//               {paragraph}
//             </p>
//           ))}
//         </div>
//       </article>

//       {/* Теги поста */}
//       <div className="">
//         <h3 className="">Теги:</h3>

//         <div className="">
//           {post.tags.map((tag: any) => (
//             <span
//               key={tag.id}
//               className=""
//             >
//               #{tag.name}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Призыв создать свой пост */}
//       <div className="">
//         <div className="">
//           <h3 className="">
//             Вдохновлены этим постом?
//           </h3>

//           <p className="">
//             Напишите свою статью и поделитесь знаниями!
//           </p>

//           <Link
//             href="/create-post"
//             className=""
//           >
//             Написать свой пост
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost} from "@/lib/posts";
import Header from "@/components/Header/Header";
import Post from "@/components/Post/Post";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const post = await getPost(postId);
  if (!post) notFound();

  return (
    <div>
      <Header />
      <Link href="/">← Назад</Link>
      <Post post={post} showFull={true} />
    </div>
  );
}
