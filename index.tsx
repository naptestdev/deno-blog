import blog from "https://deno.land/x/blog@0.3.3/blog.tsx";

blog({
  title: "NAPTheDev's Blog",
  author: "NAPTheDev",
  avatar: "./public/avatar.jpg",
  avatarClass: "rounded-full",
  links: [
    { title: "Email", url: "mailto:phongna.dev@gmail.com" },
    { title: "GitHub", url: "https://github.com/napthedev" },
  ],
  background: "#f9f9f9",
  description: "Nguyen Anh Phong",
  ogImage: "./public/avatar.jpg",
  style: "background: #000",
});
