import React, { useContext, useEffect } from "react";
import { MyContext } from "../../context/MyContext";
import { motion } from "framer-motion";
import Title from "../Title/Title";
import images from "../Images/Images";
import Layer from "../Layer/Layer";

export default function Blog() {
  const { isSelected, setIsSelected } = useContext(MyContext);

  const dummyData = [
    {
      id: 1,
      image: images.image31,
      title: "My First Steps into Programming: Learning HTML with the Help of a Friend",
      description: "My journey into programming began with a simple push from a close and supportive friend.",
      details: {
        p1: "I had always been curious about how websites were made, but I didn’t know where to start. One day, a good friend introduced me to the basics of HTML. He showed me how to structure a simple web page using just a few tags. It felt like discovering a new language — one that controlled the web.",
        p2: "We began building small pages together, experimenting with headings, paragraphs, images, and links. I quickly learned how HTML gives meaning to content and lays the foundation for everything that appears in a browser. My friend patiently explained each concept, and learning alongside someone made the experience much more enjoyable and less intimidating.",
        p3: "As I grew more confident, I started exploring HTML on my own. I would often recreate parts of websites I liked, just to see how they were built. Every small success — like getting a layout to look right — gave me a huge boost of motivation. I realized I loved building things that others could interact with. That first experience with HTML, and the encouragement from my friend, set me on a clear path. It wasn’t just about learning code — it was about discovering a creative outlet. Today, I look back at that beginning with gratitude, knowing that one simple lesson sparked a lifelong passion for web development.",
      },
      info: {
        names: "mostafa",
        date: "20 december 2023",
        keywords: "HTML, Programming Basics, Frontend",
      },
    },
    {
      id: 2,
      image: images.image32,
      title: "Why CSS Transitions Don’t Work with Height: auto and How to Fix It",
      description: "Transitions from height zero to auto won’t animate because CSS can’t interpolate undefined values.",
      details: {
        p1: "One of the first confusing things I learned about CSS transitions was that changing an element’s height from 0 to auto doesn’t animate. It just jumps instantly. This happens because auto is not a numeric value, and CSS transitions require fixed start and end values to calculate the animation steps.",
        p2: "I discovered this issue while building an expanding section using height: 0 and overflow: hidden. When triggered, I changed the height to auto, expecting a smooth animation — but instead, it popped open instantly. That’s when I learned this can’t be animated directly in CSS. I learned this valuable concept from Engineer Ahmed Sabry at Route Academy, and it helped me solve the problem more effectively.",
        p3: "To work around this, you can calculate the element’s scroll height using JavaScript and animate the height to that specific pixel value. Then, once the animation finishes, you can set the height to auto if needed. Alternatively, some developers use CSS max-height with a large enough value (like max-height: 500px) to fake the transition — but this only works if the content doesn’t exceed that height. A similar issue happens when showing or hiding an element entirely using display: none. CSS can’t transition display, so toggling visibility needs creative solutions, like using opacity, transform, or height with overflow. These small quirks can be tricky, but understanding them leads to more polished and interactive UI components.",
      },
      info: {
        names: "mostafa",
        date: "24 january 2024",
        keywords: "CSS Bugs, Fixing, Web Styling",
      },
    },
    {
      id: 3,
      image: images.image33,
      title: "How to Work with APIs in JavaScript: A Step-by-Step Beginner's Guide",
      description: "APIs let you fetch data from external sources using JavaScript to build dynamic web applications easily.",
      details: {
        p1: "When I first encountered APIs in JavaScript, the concept seemed confusing. But with practice, I learned how to send HTTP requests, handle JSON responses, and use the data to update my web pages. The basic idea is to connect your app to a service — like weather info, product lists, or news — and use that data to make your UI dynamic and useful.",
        p2: "I started learning API calls through the fetch() function. It sends a request to a URL, waits for the response, then extracts the data using .json(). Here’s a simple example I used: (fetch('https://api.example.com/data') .then(res => res.json()) .then(data => console.log(data));) I used this method in small projects, like showing user profiles or lists of blog posts. This made me feel like I was building “real” applications, not just static pages. I also learned how to handle errors using .catch() and display loading states so the user experience feels smooth. Later, I explored async/await syntax, which made the code cleaner and easier to read. For example: (const getData = async () => {try {const res = await fetch('https://api.example.com/data'); const data = await res.json(); console.log(data);} catch (err) {console.error('Error:', err);}};)",
        p3: "Working with APIs opened a new world of possibilities. I now understand how modern websites communicate with servers, and I’m continuing to explore more advanced topics like authentication, headers, and RESTful structures. It’s one of the most powerful tools I’ve learned so far in JavaScript.",
      },
      info: {
        names: "mostafa",
        date: "14 january 2025",
        keywords: "JavaScript API, Fetch, JSON Requests",
      },
    },
    {
      id: 4,
      image: images.image34,
      title: "How I Built My Portfolio Using React and Tailwind: Practical Tips and Lessons",
      description: "I built my personal portfolio using React and Tailwind, combining skills, components, and useful React hooks.",
      details: {
        p1: "One of my first complete projects was my portfolio website. I wanted it to look clean, responsive, and showcase my skills as a Front-End Developer. I chose React for building components and managing state, and Tailwind CSS for fast, consistent styling without writing too much custom CSS. I started with a navbar, then built sections like Home, About, Projects(portfolios), and Contact.",
        p2: "While working on the contact form and animations, I realized the difference between useState and useRef. I used useState to track form input values and manage visibility of components. But in some cases, like focusing an input or preventing re-renders, useRef was the better choice. Understanding this helped me avoid performance issues and organize my code more efficiently.",
        p3: "I also learned how to keep the code clean by separating components, using props smartly, and keeping logic readable. I created a reusable card component for projects and a dynamic skills section that used arrays and .map(). Tailwind made styling easier and helped me maintain consistent spacing and typography throughout the site. If you're starting your portfolio project, focus on the essentials: a clean design, smooth navigation, and clear sections. Don’t wait until you’re an expert — I started while still learning. Every section I built taught me something new about layout, React hooks, or handling user interaction. I’m proud of the result and keep improving it as I grow.",
      },
      info: {
        names: "mostafa",
        date: "14 january 2025",
        keywords: "Responsive UI, Tailwind CSS, useState",
      },
    },
    {
      id: 5,
      image: images.image35,
      title: "My Front-End Journey: From a Friend’s Help to Route Academy, School Platform",
      description: "My journey into front-end development started with a friend’s support and grew with expert training.",
      details: {
        p1: "Before I joined any official courses, I began learning HTML, CSS, and a large part of JavaScript through a close friend — Youssef Kamal. He was the one who introduced me to web development and encouraged me to keep going. I owe him a lot for helping me find this path and for pushing me to continue learning.",
        p2: "Later, I took a big step forward by enrolling in the Route Academy Front-End course. That was the true beginning of my professional development journey. The course helped me transition from self-learning to structured, hands-on experience in real front-end development.",
        p3: "At Route Academy, I was fortunate to learn from excellent instructors like Eng. Marat Magdy, Eng. Ahmed Sabry, and Eng. Yasmin Lotfy. Each one of them brought a unique style of teaching, and their clear explanations and continuous support helped me understand not just the “how” but the “why” behind the code. Currently, I’m also enrolled in a React training program by Elmadrasah Platform, which is still ongoing. Even though I haven’t finished it yet, I’m already gaining valuable insights into React components, hooks, routing, and optimization techniques. All these learning experiences together are shaping me into a confident and capable Front-End Developer, and I’m excited to keep improving every day.",
      },
      info: {
        names: "mostafa",
        date: "14 january 2025",
        keywords: "Programming Journey, Courses, Frontend",
      },
    },
    {
      id: 6,
      image: images.image36,
      title: "How to Use AI Tools and GitHub to Learn and Solve Code Problems",
      description: "AI tools and GitHub help developers learn faster, debug issues, and build better projects with confidence.",
      details: {
        p1: "As a developer, facing bugs and complex concepts is a daily challenge. AI tools like ChatGPT, GitHub Copilot, and others can provide explanations, code suggestions, and even complete functions—saving valuable time and effort during the learning process.",
        p2: "To learn effectively, don’t rely only on ready-made answers. Use AI to understand the logic behind the code. Ask follow-up questions, request examples, and explore alternative solutions. This builds real understanding rather than surface-level copying.",
        p3: "GitHub complements AI tools perfectly. It helps you manage your code history, collaborate with others, and learn from open-source projects. Browsing real repositories allows you to study code organization, naming practices, and different styles used by professionals. Combining AI-powered tools with GitHub can significantly boost your growth. Whether you’re building a small app or learning a new framework, these tools guide you step-by-step and help solve problems more independently and efficiently.",
      },
      info: {
        names: "mostafa",
        date: "14 january 2025",
        keywords: "GitHub, ChatGPT, Frontend Tools",
      },
    },
  ];

  useEffect(() => {
    if (isSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSelected]);

  return (
    <>
      <section>
        <Layer />
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <div className="container m-auto px-12 lg:px-28 pb-6">
            <Title title1={"my"} title2={"blog"} back={"posts"} />

            <div className="grid  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dummyData.map((blog) => (
                <div key={blog.id} className="group cursor-pointer max-h-[415px] overflow-hidden pr-4" onClick={() => setIsSelected(blog)}>
                  <div className="overflow-hidden rounded-t-md">
                    <img src={blog.image} alt={blog.title} className="w-full duration-300 group-hover:scale-110" />
                  </div>
                  <span className="w-full h-1.5 rounded-xl bg-gold block"></span>
                  <div className="p-5 min-h-[220px]  rounded-b-md *:pb-4 bg-myblack text-whiteof dark:bg-pale">
                    <h2 className="font-extrabold text-lg capitalize group-hover:text-gold duration-300">{blog.title}</h2>
                    <p className="font-semibold text-sm">{blog.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {isSelected && (
              <div
                onClick={() => setIsSelected(false)}
                className="bg-whiteof dark:bg-black fixed inset-0 flex justify-center items-center z-[99999999999999]"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
                  <div className="flex justify-end relative -top-1 -right-5 z-[55555]">
                    <button className="text-gold text-xl" onClick={() => setIsSelected(false)}>
                      x
                    </button>
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-mywhite text-myblack dark:bg-myblack dark:text-whiteof custom-scroll-modal rounded-lg px-2 sm:px-8 max-w-72 sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative overflow-y-auto max-h-[60vh] sm:max-h-[80vh]"
                  >
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
                      <Title title1={"post"} title2={"details"} back={"posts"} />
                      <div className="grid sm:flex *:pr-2 *:sm:pr-5 *:py-1 text-xs sm:text-base whitespace-nowrap capitalize">
                        <div className="flex items-center ">
                          <i className="fa-regular fa-id-badge text-gold pr-2"></i>
                          <h3>{isSelected.info.names}</h3>
                        </div>
                        <div className="flex items-center ">
                          <i className="fa-solid fa-calendar-days text-gold pr-2"></i>
                          <h3>{isSelected.info.date}</h3>
                        </div>
                        <div className="flex items-center ">
                          <i className="fa-solid fa-indent text-gold pr-2"></i>
                          <h3>{isSelected.info.keywords}</h3>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold my-4">{isSelected.title}</h2>
                      <img src={isSelected.image} alt={isSelected.title} className="w-full h-64 object-cover rounded" />
                      <p className="my-4">{isSelected.description}</p>
                      <div className="flex py-3">
                        <i className="fa-solid fa-quote-left pr-4 text-gold text-4xl hidden sm:block"></i>
                        <p className="text-sm">{isSelected.details.p1}</p>
                      </div>
                      <p className="text-sm">{isSelected.details.p2}</p>
                      <p className="my-4 text-sm">{isSelected.details.p3}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
