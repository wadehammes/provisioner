interface BlogPageProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  posts: any[]; // TODO: remove any type and properly type the Notion API response
}

export const BlogPage = (props: BlogPageProps) => {
  const { posts } = props;

  return (
    <>
      <div className="container centered">
        <div className="hero reduced">
          <header className="page-header secondary">
            <h1>Blog</h1>
          </header>
        </div>
        <div style={{ backgroundColor: "red" }}>
          {posts.map((post) => (
            <div key={post.id}>
              <pre>{JSON.stringify(post.id, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
