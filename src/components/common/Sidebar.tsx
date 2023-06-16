import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.png";
import useApp from "hooks/useApp";
import { menu } from "components/Data/menu";
import { menu2 } from "components/Data/menu2";

type IState = {
  isSidebarMini: boolean;
  isOpenMenu2: boolean;
  menuData: any;
  darkLightMode: any;
  updateRtl: any;
};
const INITIAL_STATE: IState = {
  isSidebarMini: false,
  isOpenMenu2: false,
  menuData: [...menu],
  darkLightMode: "light",
  updateRtl: false,
};

interface Props {
  activekey: any;
}

const Sidebar: React.FC<Props> = ({ activekey }) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { isSidebarMini, menuData, darkLightMode } = state;
  const { push } = useApp();

  useEffect(() => {
    window.document.children[0].setAttribute("data-theme", "light");

    // eslint-disable-next-line
  }, []);

  const openChildren = (id: any) => {
    var otherTabs: any = document.getElementsByClassName("has-children");
    if (otherTabs) {
      for (var i = 0; i < otherTabs.length; i++) {
        if (otherTabs[i].id !== id) {
          otherTabs[i].className = otherTabs[i].className.replace(" show", "");
          if (otherTabs[i].parentElement.children.length > 1) {
            otherTabs[i].parentElement.children[0].setAttribute(
              "aria-expanded",
              "false"
            );
          }
        }
      }
    }
    var menutab: any = document.getElementById(id);
    if (menutab) {
      if (menutab.classList.contains("show")) {
        menutab.classList.remove("show");
        if (menutab.parentElement.children.length > 1) {
          menutab.parentElement.children[0].setAttribute(
            "aria-expanded",
            "false"
          );
        }
      } else {
        menutab.classList.add("show");
        if (menutab.parentElement.children.length > 1) {
          menutab.parentElement.children[0].setAttribute(
            "aria-expanded",
            "true"
          );
        }
      }
    }
  };

  const openChildren1 = (id: any) => {
    var otherTabs: any = document.getElementsByClassName("has-children");
    if (otherTabs) {
      for (var i = 0; i < otherTabs.length; i++) {
        otherTabs[i].className = otherTabs[i].className.replace(" show", "");
      }
    }
    var menutab: any = document.getElementById(id);
    if (menutab) {
      menutab.classList.add("show");
      if (menutab.parentElement.children.length > 1) {
        menutab.parentElement.children[0].setAttribute("aria-expanded", "true");
      }
    }
  };

  // const closeChildren = () => {
  //   var otherTabs: any = document.getElementsByClassName("has-children");
  //   if (otherTabs) {
  //     for (var i = 0; i < otherTabs.length; i++) {
  //       otherTabs[i].className = otherTabs[i].className.replace(" show", "");
  //       if (otherTabs[i].parentElement.children.length > 1) {
  //         otherTabs[i].parentElement.children[0].setAttribute(
  //           "aria-expanded",
  //           "false"
  //         );
  //       }
  //     }
  //   }
  // };

  const GotoChangeMenu = (val: any) => {
    if (val === "UI Components") {
      push("ui-alerts");
      setState((prevState) => ({ ...prevState, menuData: [...menu2] }));
    } else {
      push("hr-dashboard");
      setState((prevState) => ({ ...prevState, menuData: [...menu] }));
    }
  };

  const onChangeDarkMode = () => {
    if (window.document.children[0].getAttribute("data-theme") === "light") {
      window.document.children[0].setAttribute("data-theme", "dark");
      setState((prevState) => ({
        ...prevState,
        darkLightMode: "dark",
      }));
    } else {
      window.document.children[0].setAttribute("data-theme", "light");
      setState((prevState) => ({
        ...prevState,
        darkLightMode: "light",
      }));
    }
  };

  const onChangeRTLMode = () => {
    if (document.body.classList.contains("rtl_mode")) {
      document.body.classList.remove("rtl_mode");
    } else {
      document.body.classList.add("rtl_mode");
    }
    setState((prevState) => ({
      ...prevState,
      updateRtl: !prevState.updateRtl,
    }));
  };

  return (
    <div
      id="mainSideMenu"
      className={`sidebar px-4 py-4 py-md-5 me-0 ${isSidebarMini ? "sidebar-mini" : ""
        }`}
    >
      <div className="d-flex flex-column h-100">
        <a href="hr-dashboard" className="mb-0 brand-icon">
          <span className="logo-icon">
            <img src={Logo} alt="logo" className="logo" />
          </span>
          <span className="logo-text">My Task</span>
        </a>
        <ul className="menu-list flex-grow-1 mt-3">
          {menuData.map((d: any, i: any) => {
            if (d.isToggled) {
              return (
                <li key={"shsdg" + i}>
                  <a
                    className={`m-link `}
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                      GotoChangeMenu(d.name);
                    }}
                  >
                    <i className={d.iconClass}></i>
                    <span>{d.name}</span>
                  </a>
                </li>
              );
            }
            if (d.children.length === 0) {
              return (
                <li key={"dsfshsdg" + i} className=" collapsed">
                  <Link
                    to={d.routerLink[0]}
                    className={`m-link ${d.routerLink[0] === activekey ? "active" : ""
                      }`}
                  >
                    <i className={d.iconClass}></i>
                    <span>{d.name}</span>
                    {/* <span className="arrow icofont-dotted-down ms-auto text-end fs-5"></span> */}
                  </Link>
                </li>
              );
            }
            return (
              <li key={"shsdg" + i} className=" collapsed">
                <a
                  className={`m-link ${d.children.filter(
                    (d: any) => "/" + d.routerLink[0] === activekey
                  ).length > 0
                      ? "active"
                      : ""
                    }`}
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    openChildren("menu-Pages" + i);
                  }}
                >
                  <i className={d.iconClass}></i>
                  <span>{d.name}</span>
                  <span className="arrow icofont-dotted-down ms-auto text-end fs-5"></span>
                </a>
                {d.children.length > 0 ? (
                  <ul
                    className="sub-menu collapse has-children"
                    id={"menu-Pages" + i}
                  >
                    {d.children.map((data: any, ind: any) => {
                      if (d.children.length > 0) {
                        if (activekey === "/" + data.routerLink[0]) {
                          setTimeout(() => {
                            openChildren1("menu-Pages" + i);
                          }, 500);
                        }
                      }
                      return (
                        <li key={"jfdgj" + ind}>
                          <Link
                            className={
                              activekey === "/" + data.routerLink[0]
                                ? "ms-link active"
                                : "ms-link"
                            }
                            to={
                              process.env.PUBLIC_URL + "/" + data.routerLink[0]
                            }
                          >
                            {" "}
                            <span>{data.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        {/* <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-center justify-content-center">
            <div className="form-check form-switch theme-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkLightMode === "dark" ? true : false}
                id="theme-switch"
                onChange={() => {
                  onChangeDarkMode();
                }}
              />
              <label className="form-check-label" htmlFor="theme-switch">
                Enable Dark Mode!
              </label>
            </div>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            <div className="form-check form-switch theme-rtl">
              <input
                className="form-check-input"
                type="checkbox"
                checked={document.body.classList.contains("rtl_mode")}
                id="theme-rtl"
                onChange={() => {
                  onChangeRTLMode();
                }}
              />
              <label className="form-check-label" htmlFor="theme-rtl">
                Enable RTL Mode!
              </label>
            </div>
          </li>
        </ul> */}
        <button
          type="button"
          className="btn btn-link sidebar-mini-btn text-light"
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              isSidebarMini: !isSidebarMini,
            }));
          }}
        >
          <span className="ms-2">
            <i className="icofont-bubble-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
