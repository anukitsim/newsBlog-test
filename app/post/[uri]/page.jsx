import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";

async function getPost(slug) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        articleFields {
          title
          body
          embedImage {
            altText
            sourceUrl
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        videoGroup {
          embeddedVideo
          uploadedVideo {
            date
          }
        }
      }
    }
  `;

  const variables = {
    slug: slug,
  };


  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.post) {
    return responseBody.data.post;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

async function PostDetails({ params }) {
  const post = await getPost(params.uri);

  return (
    <main>
      <nav className="flex justify-center">
        <h1>{post.articleFields.title}</h1>
      </nav>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col gap-10 justify-center">
          <p
            className="text-white"
            dangerouslySetInnerHTML={{ __html: post.articleFields.body }}
          />
          {post.articleFields.embedImage && (
            <Image
              src={post.articleFields.embedImage.sourceUrl}
              alt={post.articleFields.title}
              width={500}
              height={300}
              objectFit="cover"
            />
          )}
         {post.videoGroup.embeddedVideo && (
          <iframe
          width="560"
          height="315"
          src={post.videoGroup.embeddedVideo}
          title={post.articleFields.title}
          >
            
          </iframe>
         )}
        </div>
      </Suspense>
    </main>
  );
}

export default PostDetails;
