---
title: Error Boundaries trong React
publish_date: 2022-06-17
---

## Vấn đề

Chắc hẳn ai lúc mới học code react cũng sẽ gặp những lỗi như này

![image](https://cdn.sanity.io/images/lnge11x2/production/c3286107e8c1e949365de3af1288cfab1119a24e-1144x682.png?w=550)

Với một react developer đã có kinh nghiệm thì đây sẽ không phải một vấn đề to lớn để fix, nhưng khi một dự án lớn đưa vào production thì sẽ không thể handle được hết các edge cases và nếu render có thể sẽ hiển thị màn hình trắng bóc gây phiền toái cho người dùng. Vậy nên react đã có **Error Boundaries** để handle việc render error này

## Bắt đầu code

Tạo một file `components/ErrorBoundary.jsx`

```javascript
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Gửi thông tin error lên server để dev nhận thông tin fix bug
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h4>Something went wrong</h4>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

> Hiện nay error boundaries mới chỉ hỗ trợ react class component, nhưng hoàn toàn có thể viết ra một component riêng và đưa làm wrapper rồi dùng các functional component khác.

Đưa component ErrorBoundary vào index.jsx để wrap mọi component làm children của component này

```javascript
import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import ErrorBoundary from "./components/ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
```

Tạo một component để test và có thể tạo ra error khi render

```javascript
import { useState } from "react";

export default function App() {
  const [person, setPerson] = useState({ name: "Bob" });

  return (
    <div>
      <p>Name: {person.name}</p>
      <button onClick={() => setPerson(null)}>Set null</button>
    </div>
  );
}
```

## Kết quả

Demo việc handle error

![image](https://cdn.sanity.io/images/lnge11x2/production/e30667cdb4a4e3f4cd8001c34cc47cfa831c3e1a-648x334.gif?w=450)

Lỗi sẽ được in ra console

![image](https://cdn.sanity.io/images/lnge11x2/production/fb7be18c214ac4d20ba373d94fae47f9f9cb8ade-1062x378.png?w=700)

Ta có thể gửi error này lên server để dev có thể biết và fix bug trong thời gian sớm nhất.

## Nguồn

[Docs chính thức của react](https://reactjs.org/docs/error-boundaries.html)

## Kết luận

Vậy là mình đã chia sẻ về cách handle render error rất tốt cho việc xử lí lỗi trong production. Hi vọng bài viết giúp ích mọi người.
