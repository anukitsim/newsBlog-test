"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";



async function getPosts() {
  const query = `
    {
      posts {
        nodes {
          categories {
            nodes {
              name
              slug
            }
          }
          articleFields {
            title
            embedImage {
              altText
              sourceUrl
            }
          }
          uri
        }
      }
    }
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { data } = await res.json();

  console.log("Raw GraphQL Data:", data);
  return data.posts.nodes;
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const selectedCategories = ["category1", "category2", "category3", "category4"];

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const categoryPosts = {};
  selectedCategories.forEach((category) => {
    categoryPosts[category] = posts.filter((post) =>
      post.categories.nodes.some((cat) => cat.slug.toLowerCase() === category)
    );
  });


  return (
    <main className="flex flex-col gap-32 text-white">
      <Suspense fallback={<Loading />}>
        <div className="flex flex-row gap-10">
          {/* Render posts with category1 in the first column */}
          {categoryPosts["category1"]?.map((post) => (
            <div key={post.uri} className="w-6/12 relative">
              <Link href="/post/[uri]" as={`/post/${post.uri}`}>
                <>
                  {post.articleFields.embedImage && (
                      <img
                      src={post.articleFields.embedImage.sourceUrl}
                      alt={post.articleFields.title}
                      objectFit="cover"
                    />
                  )}
                   <div className="absolute top-0 left-10 right-0 bottom-0 flex items-end justify-start">
                    <h3 className="text-lg font-bold mb-2">{post.articleFields.title}</h3>
                  </div>
                </>
              </Link>
            </div>
          ))}
          {/* Render posts with category2 in the second column */}
          {categoryPosts["category2"]?.map((post) => (
            <div key={post.uri} className="w-6/12 relative">
              <Link href="/post/[uri]" as={`/post/${post.uri}`}>
                <>
                  {post.articleFields.embedImage && (
                    <img
                      src={post.articleFields.embedImage.sourceUrl}
                      alt={post.articleFields.title}
                      objectFit="cover"
                    />
                  )}
                   <div className="absolute top-0 left-10 right-0 bottom-0 flex items-end justify-start">
                    <h3 className="text-lg font-bold mb-2">{post.articleFields.title}</h3>
                  </div>
                </>
              </Link>
            </div>
          ))}
        </div>
        {/* Render posts with category3 in a separate row */}
        <div className="w-full flex justify-center">
          {categoryPosts["category3"]?.map((post) => (
            <div key={post.uri} className="relative">
              <Link href={`/post/[uri]`} as={`/post/${post.uri}`}>
                <>
                  {post.articleFields.embedImage && (
                    <img
                      src={post.articleFields.embedImage.sourceUrl}
                      alt={post.articleFields.title}
                      objectFit="cover"
                    />
                  )}
                    <div className="absolute top-0 left-10 right-0 bottom-0 flex items-end justify-start">
                    <h3 className="text-lg font-bold mb-2">{post.articleFields.title}</h3>
                  </div>
                </>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-10">
          {/* Render posts with category4 in the first column */}
          {categoryPosts["category4"]?.map((post) => (
            <div key={post.uri} className="w-6/12 relative">
             <Link href="/post/[uri]" as={`/post/${post.uri}`}>
                <>
                  {post.articleFields.embedImage && (
                     <img
                     src={post.articleFields.embedImage.sourceUrl}
                     alt={post.articleFields.title}
                     objectFit="cover"
                   />
                  )}
                  <div className="absolute top-0 left-10 right-0 bottom-0 flex items-end justify-start">
                    <h3 className="text-lg font-bold mb-2">{post.articleFields.title}</h3>
                  </div>
                </>
              </Link>
            </div>
          ))}
          {/* Render posts with category2 in the second column */}
          {categoryPosts["category2"]?.map((post) => (
            <div key={post.uri} className="w-6/12 relative">
              <Link href={`/post/[uri]`} as={`/post/${post.uri}`}>
                <>
                  {post.articleFields.embedImage && (
                     <img
                     src={post.articleFields.embedImage.sourceUrl}
                     alt={post.articleFields.title}
                     objectFit="cover"
                   />
                  )}
                    <div className="absolute top-0 left-10 right-0 bottom-0 flex items-end justify-start">
                    <h3 className="text-lg font-bold mb-2">{post.articleFields.title}</h3>
                  </div>
                </>
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </main>
  );
}