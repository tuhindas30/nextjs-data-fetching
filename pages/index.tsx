import type { NextPage } from "next";
import Link from "next/link";
import MetaTags from "../src/components/MetaTags";

const Home: NextPage = () => {
  return (
    <div className="container">
      <MetaTags
        title="Nextjs Data Fetch"
        description="Demonstrates Next.js Data Fetching Ways"
      />
      <main className="main">
        <h1 className="title">
          <a href="https://nextjs.org">Next.js</a> Data Fetch Strategies
        </h1>
        <section className="card-container">
          <div className="grid">
            <Link href="/ssg" passHref>
              <a className="card">
                <h2>Static Site Generation</h2>
                <p>This page was pre-rendered at the time of build.</p>
              </a>
            </Link>
            <Link href="/ssr" passHref>
              <a className="card">
                <h2>Server Side Rendering</h2>
                <p>This page gets pre-rendered for each request.</p>
              </a>
            </Link>
          </div>
          <div className="grid">
            <Link href="/csr" passHref>
              <a className="card">
                <h2>Client Side Rendering</h2>
                <p>
                  Simple data fetching inside&nbsp;
                  <code className="code">useEffect</code>
                </p>
              </a>
            </Link>
            <Link href="/isr" passHref>
              <a className="card">
                <h2>Incremental Static Regeneration</h2>
                <p>This page rebuild itself after any data update.</p>
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
