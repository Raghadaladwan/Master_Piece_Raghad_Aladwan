<div className="header">
<Link to={"/"}>
  {/* Add image */}
  LOGO
</Link>

<ul>
  <li>
    <a href="/about">
      <i></i> ABOUT US
    </a>
  </li>

  <li>
    <a href="/">
      <i></i> Landing page
    </a>
  </li>
  <li>
    <a href="/registerpage">
      <i></i> Register
    </a>
  </li>
  <li>
    <Link
      to={
        cookie.load("isLoggedIn") === undefined ? "/loginpage" : "/"
      }
    >
      <i></i>
      {cookie.load("isLoggedIn") === undefined
        ? "Log in"
        : "Log out"}
    </Link>
  </li>
</ul>
</div>
</>
);
} else
return (
<div className="header">
<Link to={"/"}>
{/* Add image */}
LOGO
</Link>

<ul>
<li>
  <a href="/about">
    <i></i> ABOUT US
  </a>
</li>
<li>
  <a href="/">
    <i></i> LANDING
  </a>
</li>
<li>
  <a href="/postspage">
    <i></i> Posts Page
  </a>
</li>

<div
// style={{
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center"
// }}
>
  <div style={{ fontStyle: "italic" }}>
    {this.state.userInfo !== null
      ? `Welcome back ${this.state.userInfo.email.toUpperCase()} !`
      : ""}
  </div>

  <div>
    <Link to={"/admindashboardpage"}>
      <i></i>
      {cookie.load("isLoggedIn") === undefined ? "" : "Dashboard"}
    </Link>
  </div>
  <div>
    <Link to={"/userprofile"}>
      <i></i>
      {cookie.load("isLoggedIn") === undefined ? "" : "Profile"}
    </Link>
  </div>

  <span onClick={this.signOut}>
    <Link to={"/"}>
      <i></i> {"Log out"}
    </Link>
  </span>
</div>
</ul>
</div>
);
