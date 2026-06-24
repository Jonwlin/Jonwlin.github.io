import { HEADING } from "@/lib/home";

type Project = {
  img: string;
  alt: string;
  name: string;
  description: React.ReactNode;
  links?: { label: string; href: string }[];
};

// Project cards (ported verbatim from the old static homepage).
const PROJECTS: Project[] = [
  {
    img: "/acc_order.jpg",
    alt: "Walmart Labs car order tracking project",
    name: "Walmart Labs",
    description: (
      <>
        For Walmart Labs, I built a feature application that allows over 35
        million customers a year to track the status of their car order. I&apos;m
        really proud of this project because I worked from end to end and created
        both the frontend and backend. I was guided by Full-time engineers but
        was allowed to take full ownership of the project. After completion, I
        demoed the app in front of over 500 employees in two different Senior VP
        conferences. I enjoyed juggling the different teams I had to work with and
        learning new technologies throughout the project. I worked with UI/UX,
        app integration teams, IOS, Android, backend security, store directors,
        and marketing.
      </>
    ),
  },
  {
    img: "/p1-2.jpeg",
    alt: "Cazador Investments real estate data project",
    name: "Cazador Investments, LLC",
    description: (
      <>
        • Feature selected based on industry knowledge, cleaned, and classified
        80k properties with 40 columns of housing data points. Used Sci-kit
        Linear Regression on subsets to predict undervalued, potentially high
        Return-on-Investment off market acquisitions
        <br />• Increased acquisition response rate by 23% and reduced
        acquisition costs by 6%
      </>
    ),
  },
  {
    img: "/machaon.png",
    alt: "Machaon Diagnostics genetic data analysis project",
    name: "Machaon Diagnostics",
    description: (
      <>
        • Evaluated Poisson distribution on empirically generated models in
        Python using Pandas/SciPy for genetic data to analyze normalized curves
        for the expected number of mutations in a specific
        <br />
        gene, was included in a validation research paper
      </>
    ),
    links: [
      {
        label: "PowerPoint",
        href: "https://drive.google.com/file/d/1LKv1825kjObp2muwfS8uyAJA_pl_pQ8a/view?usp=sharing",
      },
    ],
  },
  {
    img: "/datathon.png",
    alt: "Datathon Google Local Recommender project",
    name: "Datathon - Google Local Recommender",
    description: (
      <>
        • Feature selected 3 important factors (rating, distance, num reviews)
        after Exploratory Data Analysis
        <br />• Built a cosine similarity recommender to pair similar users and
        suggest businesses
      </>
    ),
  },
  {
    img: "/download.svg",
    alt: "Universal React Web App project",
    name: "Universal React Web App",
    description: (
      <>
        • React Web-App using both Client and Server-side rendering which allows
        loading with or without JavaScript enabled. Optimizes speed, usability,
        and SEO. Deployed through Heroku app
      </>
    ),
    links: [{ label: "Github", href: "https://github.com/Jonwlin/jwlin-react" }],
  },
  {
    img: "/designathon.jpg",
    alt: "UCSD Designathon Design Frontier project",
    name: "UCSD Designathon Design Frontier",
    description: (
      <>
        • Collaboratively designed a possible innovative solution to a design
        brief
        <br />• Utilized the large immersive screen to improve communication in
        virtual meetings
      </>
    ),
    links: [
      {
        label: "PowerPoint",
        href: "https://docs.google.com/presentation/d/1_nTS15QRyM4K9UKKTl_f5aIdyUmLR1smClZs7v2jJ4Q/edit?usp=sharing",
      },
    ],
  },
  {
    img: "/aenigmagraph.jpg",
    alt: "Aenigmagraph image obscuring project",
    name: "Obscuring Images",
    description: (
      <>
        • Generated shortest spanning algorithms, Prim&apos;s, to store
        information in a 2D arrays so that it is difficult to read/decipher. Used
        Java to create a program that uses a seed to obscure an image beyond
        recognition and store information within the layers
      </>
    ),
    links: [
      { label: "Paper", href: "/docs/Aenigmagraph.pdf" },
      { label: "Github", href: "https://github.com/Jwlin17/mst_2d_array_project" },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Masthead */}
      <header className="bg-home-bg px-5 pt-[90px] pb-[70px]">
        <div className="p-5 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.jpeg"
            alt="Jonathan W. Lin"
            className="m-[30px] inline-block h-[150px] w-[150px] rounded-full object-cover"
          />
          <h1 className={`${HEADING} mb-[35px] text-[2.75rem] text-black`}>
            Jonathan W. Lin
          </h1>
          <p className="mb-6 text-[1.15rem] text-black">
            Software Engineer at Instagram | Ex-Microsoft | Data Science B.S.
          </p>
          <p className="mb-6 text-[1.15rem] text-black">
            Using data to inform product direction, trying to build the best user
            experiences, and tackling the hardest technical problems
          </p>
        </div>
      </header>

      {/* Experience & Projects */}
      <section id="projects" className="bg-home-section p-[30px] text-home-ink">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-[600px] text-center text-[16px]">
            <h2
              className={`${HEADING} mb-10 pt-10 max-[767px]:mb-[25px] max-[767px]:pt-[25px] max-[767px]:text-[24px]`}
            >
              Experience &amp; Projects
            </h2>
            <p className="mb-5 text-black">
              These are various work experiences and projects that I&apos;ve
              worked on. I am always looking for new opportunities so feel free to
              reach out to me!
            </p>
          </div>

          <div className="flex flex-wrap justify-center pb-10">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="mx-auto my-[10px] min-h-[425px] min-w-[350px] max-w-[350px] rounded-[25px] bg-home-card p-5 text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.img}
                  alt={p.alt}
                  className="h-auto max-w-full rounded-[20px]"
                />
                <h3 className={`${HEADING} mb-2 mt-7`}>{p.name}</h3>
                <p className="mt-[15px] text-[15px] text-black">
                  {p.description}
                </p>
                {p.links?.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="mt-2 block text-[#0d6efd] underline hover:text-[#0a58ca]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="m-[5%] bg-home-bg py-10 text-home-footer">
        <div className="pb-[25px] text-center">
          <a
            href="https://www.linkedin.com/in/xjonathan"
            aria-label="LinkedIn"
            className="mx-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-home-border text-[24px] opacity-75 hover:opacity-90"
          >
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a
            href="https://github.com/Jonwlin"
            aria-label="GitHub"
            className="mx-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-home-border text-[24px] opacity-75 hover:opacity-90"
          >
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}
