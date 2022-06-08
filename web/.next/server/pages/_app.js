/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/contexts/AuthContext.tsx":
/*!**************************************!*\
  !*** ./src/contexts/AuthContext.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider),\n/* harmony export */   \"signOut\": () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_apiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/apiClient */ \"./src/services/apiClient.ts\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction signOut() {\n    try {\n        (0,nookies__WEBPACK_IMPORTED_MODULE_3__.destroyCookie)(undefined, \"@nextauth.token\");\n        next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/\");\n    } catch  {\n    //erro ao deslogar\n    }\n}\nfunction AuthProvider({ children  }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const { \"@nextauth.token\": token  } = (0,nookies__WEBPACK_IMPORTED_MODULE_3__.parseCookies)();\n        if (token) {\n            _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.get(\"/me\").then((response)=>{\n                const { id , name , email  } = response.data;\n                setUser({\n                    id,\n                    name,\n                    email\n                });\n            }).catch(()=>{\n                signOut();\n            });\n        }\n    }, []);\n    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const isAuthenticated = !!user;\n    async function signIn({ email , password  }) {\n        try {\n            const response = await _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.post(\"/session\", {\n                email,\n                password\n            });\n            const { id , name , token  } = response.data;\n            (0,nookies__WEBPACK_IMPORTED_MODULE_3__.setCookie)(undefined, \"@nextauth.token\", token, {\n                maxAge: 60 * 60 * 24 * 30,\n                path: \"/\"\n            });\n            setUser({\n                id,\n                name,\n                email\n            });\n            _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.defaults.headers.Authorization = `Bearer ${token}`;\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(\"Logado com sucesso\");\n            next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/dashboard\");\n        } catch (err) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(\"Erro ao acessar\");\n            console.log(\"Erro ao acessar\", err);\n        }\n    }\n    async function signUp({ name , email , password  }) {\n        try {\n            const response = await _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.post(\"/users\", {\n                name,\n                email,\n                password\n            });\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(\"Conta criada com sucesso\");\n            next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/\");\n        } catch (err) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(\"Erro ao cadastrar\");\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isAuthenticated,\n            signIn,\n            signOut,\n            signUp\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\freez\\\\OneDrive\\\\Documents\\\\Coding\\\\Pizzaria\\\\web\\\\src\\\\contexts\\\\AuthContext.tsx\",\n        lineNumber: 124,\n        columnNumber: 9\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVcsQ0FBQytCLFFBQVE7UUFBQ0MsS0FBSyxFQUFFO1lBQUVoQixJQUFJO1lBQUVDLGVBQWU7WUFBRUMsTUFBTTtZQUFFakIsT0FBTztZQUFFNkIsTUFBTTtTQUFFO2tCQUMxRXpCLFFBQVE7Ozs7O1lBQ1UsQ0FDMUI7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4PzFmYTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgUmVhY3ROb2RlLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcblxyXG5pbXBvcnQgeyBhcGkgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGlDbGllbnQnXHJcblxyXG5pbXBvcnQgeyBkZXN0cm95Q29va2llLCBzZXRDb29raWUsIHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnXHJcbmltcG9ydCBSb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInXHJcblxyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5J1xyXG5cclxudHlwZSBBdXRoQ29udGV4dERhdGEgPSB7XHJcbiAgICB1c2VyOiBVc2VyUHJvcHMsXHJcbiAgICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW4sXHJcbiAgICBzaWduSW46IChjcmVkZW50aWFsczogU2lnbkluUHJvcHMpID0+IFByb21pc2U8dm9pZD5cclxuICAgIHNpZ25PdXQ6ICgpID0+IHZvaWRcclxuICAgIHNpZ25VcDogKGNyZWRlbnRpYWxzOiBTaWduVXBQcm9wcykgPT4gUHJvbWlzZTx2b2lkPlxyXG59XHJcblxyXG50eXBlIFVzZXJQcm9wcyA9IHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbWFpbDogc3RyaW5nLFxyXG59XHJcblxyXG50eXBlIFNpZ25JblByb3BzID0ge1xyXG4gICAgZW1haWw6IHN0cmluZyxcclxuICAgIHBhc3N3b3JkOiBzdHJpbmcsXHJcbn1cclxuXHJcbnR5cGUgU2lnblVwUHJvcHMgPSB7XHJcbiAgICBuYW1lOiBzdHJpbmcsXHJcbiAgICBlbWFpbDogc3RyaW5nLFxyXG4gICAgcGFzc3dvcmQ6IHN0cmluZyxcclxufVxyXG5cclxudHlwZSBBdXRoUHJvdmlkZXJQcm9wcyA9IHtcclxuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGUsXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoe30gYXMgQXV0aENvbnRleHREYXRhKVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNpZ25PdXQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGRlc3Ryb3lDb29raWUodW5kZWZpbmVkLCAnQG5leHRhdXRoLnRva2VuJylcclxuICAgICAgICBSb3V0ZXIucHVzaCgnLycpXHJcbiAgICB9XHJcbiAgICBjYXRjaCB7XHJcbiAgICAgICAgLy9lcnJvIGFvIGRlc2xvZ2FyXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiBBdXRoUHJvdmlkZXJQcm9wcykge1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeyAnQG5leHRhdXRoLnRva2VuJzogdG9rZW4gfSA9IHBhcnNlQ29va2llcygpXHJcblxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBhcGkuZ2V0KCcvbWUnKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQsIG5hbWUsIGVtYWlsIH0gPSByZXNwb25zZS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRVc2VyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzaWduT3V0KClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSwgW10pXHJcblxyXG4gICAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlclByb3BzPigpXHJcbiAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSAhIXVzZXJcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBzaWduSW4oeyBlbWFpbCwgcGFzc3dvcmQgfTogU2lnbkluUHJvcHMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvc2Vzc2lvbicsIHtcclxuICAgICAgICAgICAgICAgIGVtYWlsLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zdCB7IGlkLCBuYW1lLCB0b2tlbiB9ID0gcmVzcG9uc2UuZGF0YVxyXG5cclxuICAgICAgICAgICAgc2V0Q29va2llKHVuZGVmaW5lZCwgJ0BuZXh0YXV0aC50b2tlbicsIHRva2VuLCB7XHJcbiAgICAgICAgICAgICAgICBtYXhBZ2U6IDYwICogNjAgKiAyNCAqIDMwLCAvLyBleHBpcmUgaW4gMSBtb250aFxyXG4gICAgICAgICAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgc2V0VXNlcih7XHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbCxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGFwaS5kZWZhdWx0cy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YFxyXG5cclxuICAgICAgICAgICAgdG9hc3Quc3VjY2VzcygnTG9nYWRvIGNvbSBzdWNlc3NvJylcclxuXHJcbiAgICAgICAgICAgIFJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJylcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHRvYXN0LmVycm9yKCdFcnJvIGFvIGFjZXNzYXInKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm8gYW8gYWNlc3NhclwiLCBlcnIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNpZ25VcCh7IG5hbWUsIGVtYWlsLCBwYXNzd29yZCB9OiBTaWduVXBQcm9wcykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoJy91c2VycycsIHtcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbCxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdG9hc3Quc3VjY2VzcygnQ29udGEgY3JpYWRhIGNvbSBzdWNlc3NvJylcclxuICAgICAgICAgICAgUm91dGVyLnB1c2goJy8nKVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0b2FzdC5lcnJvcignRXJybyBhbyBjYWRhc3RyYXInKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBpc0F1dGhlbnRpY2F0ZWQsIHNpZ25Jbiwgc2lnbk91dCwgc2lnblVwIH19PlxyXG4gICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgPC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cclxuICAgIClcclxufSJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJhcGkiLCJkZXN0cm95Q29va2llIiwic2V0Q29va2llIiwicGFyc2VDb29raWVzIiwiUm91dGVyIiwidG9hc3QiLCJBdXRoQ29udGV4dCIsInNpZ25PdXQiLCJ1bmRlZmluZWQiLCJwdXNoIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ0b2tlbiIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImlkIiwibmFtZSIsImVtYWlsIiwiZGF0YSIsInNldFVzZXIiLCJjYXRjaCIsInVzZXIiLCJpc0F1dGhlbnRpY2F0ZWQiLCJzaWduSW4iLCJwYXNzd29yZCIsInBvc3QiLCJtYXhBZ2UiLCJwYXRoIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwic3VjY2VzcyIsImVyciIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInNpZ25VcCIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\freez\\\\OneDrive\\\\Documents\\\\Coding\\\\Pizzaria\\\\web\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {\n                autoClose: 3000\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\freez\\\\OneDrive\\\\Documents\\\\Coding\\\\Pizzaria\\\\web\\\\src\\\\pages\\\\_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\freez\\\\OneDrive\\\\Documents\\\\Coding\\\\Pizzaria\\\\web\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQWtDO0FBRWE7QUFDRDtBQUVRO0FBRXRELFNBQVNFLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBWSxFQUFFO0lBQ2pELHFCQUNFLDhEQUFDSCwrREFBWTs7MEJBQ1gsOERBQUNFLFNBQVM7Z0JBQUUsR0FBR0MsU0FBUzs7Ozs7b0JBQUk7MEJBQzVCLDhEQUFDSiwwREFBYztnQkFBQ0ssU0FBUyxFQUFFLElBQUk7Ozs7O29CQUFHOzs7Ozs7WUFDckIsQ0FDaEI7Q0FDRjtBQUVELGlFQUFlSCxLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvdGVuZC8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bGVzL2dsb2JhbHMuc2NzcydcclxuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcclxuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tICdyZWFjdC10b2FzdGlmeSdcclxuaW1wb3J0ICdyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzJ1xyXG5cclxuaW1wb3J0IHsgQXV0aFByb3ZpZGVyIH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnXHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxBdXRoUHJvdmlkZXI+XHJcbiAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz4gXHJcbiAgICAgIDxUb2FzdENvbnRhaW5lciBhdXRvQ2xvc2U9ezMwMDB9Lz5cclxuICAgIDwvQXV0aFByb3ZpZGVyPlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHBcclxuIl0sIm5hbWVzIjpbIlRvYXN0Q29udGFpbmVyIiwiQXV0aFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJhdXRvQ2xvc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupAPIClient\": () => (/* binding */ setupAPIClient)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _errors_AuthTokenError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors/AuthTokenError */ \"./src/services/errors/AuthTokenError.ts\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n\n\n\n\nfunction setupAPIClient(ctx = undefined) {\n    let cookies = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx);\n    const api = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n        baseURL: \"https://sheltered-shore-48117.herokuapp.com\",\n        headers: {\n            Authorization: `Bearer ${cookies[\"@nextauth.token\"]}`\n        }\n    });\n    api.interceptors.response.use((response)=>{\n        return response;\n    }, (error)=>{\n        if (error.response.status === 401) {\n            if (true) {\n                (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__.signOut)();\n            } else {}\n        }\n        return Promise.reject(error);\n    });\n    return api;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBeUM7QUFDSDtBQUNrQjtBQUVQO0FBRTFDLFNBQVNJLGNBQWMsQ0FBQ0MsR0FBRyxHQUFHQyxTQUFTLEVBQUM7SUFDM0MsSUFBSUMsT0FBTyxHQUFHTixxREFBWSxDQUFDSSxHQUFHLENBQUM7SUFFL0IsTUFBTUcsR0FBRyxHQUFHUixtREFBWSxDQUFDO1FBQ3JCVSxPQUFPLEVBQUUsNkNBQTZDO1FBQ3REQyxPQUFPLEVBQUU7WUFDTEMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFTCxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0tBQ0osQ0FBQztJQUVGQyxHQUFHLENBQUNLLFlBQVksQ0FBQ0MsUUFBUSxDQUFDQyxHQUFHLENBQUNELENBQUFBLFFBQVEsR0FBSTtRQUN0QyxPQUFPQSxRQUFRO0tBQ2xCLEVBQUUsQ0FBQ0UsS0FBaUIsR0FBSztRQUN0QixJQUFHQSxLQUFLLENBQUNGLFFBQVEsQ0FBQ0csTUFBTSxLQUFLLEdBQUcsRUFBQztZQUM3QixJQUFHLElBQTJCLEVBQUM7Z0JBQzNCZCw4REFBTyxFQUFFO2FBQ1osTUFBSSxFQUVKO1NBQ0o7UUFFRCxPQUFPZSxPQUFPLENBQUNDLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDO0tBQy9CLENBQUM7SUFFRixPQUFPUixHQUFHO0NBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm90ZW5kLy4vc3JjL3NlcnZpY2VzL2FwaS50cz85NTZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnXHJcbmltcG9ydCB7IHBhcnNlQ29va2llcyB9IGZyb20gJ25vb2tpZXMnXHJcbmltcG9ydCB7IEF1dGhUb2tlbkVycm9yIH0gZnJvbSAnLi9lcnJvcnMvQXV0aFRva2VuRXJyb3InXHJcblxyXG5pbXBvcnQgeyBzaWduT3V0IH0gZnJvbSAnLi4vY29udGV4dHMvQXV0aENvbnRleHQnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBUElDbGllbnQoY3R4ID0gdW5kZWZpbmVkKXtcclxuICAgIGxldCBjb29raWVzID0gcGFyc2VDb29raWVzKGN0eClcclxuXHJcbiAgICBjb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xyXG4gICAgICAgIGJhc2VVUkw6ICdodHRwczovL3NoZWx0ZXJlZC1zaG9yZS00ODExNy5oZXJva3VhcHAuY29tJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHtjb29raWVzWydAbmV4dGF1dGgudG9rZW4nXX1gXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBhcGkuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLnVzZShyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgICB9LCAoZXJyb3I6IEF4aW9zRXJyb3IpID0+IHtcclxuICAgICAgICBpZihlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSl7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICBzaWduT3V0KClcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEF1dGhUb2tlbkVycm9yKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGFwaVxyXG59Il0sIm5hbWVzIjpbImF4aW9zIiwicGFyc2VDb29raWVzIiwiQXV0aFRva2VuRXJyb3IiLCJzaWduT3V0Iiwic2V0dXBBUElDbGllbnQiLCJjdHgiLCJ1bmRlZmluZWQiLCJjb29raWVzIiwiYXBpIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiaW50ZXJjZXB0b3JzIiwicmVzcG9uc2UiLCJ1c2UiLCJlcnJvciIsInN0YXR1cyIsIlByb21pc2UiLCJyZWplY3QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/api.ts\n");

/***/ }),

/***/ "./src/services/apiClient.ts":
/*!***********************************!*\
  !*** ./src/services/apiClient.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/services/api.ts\");\n\nconst api = (0,_api__WEBPACK_IMPORTED_MODULE_0__.setupAPIClient)();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpQ2xpZW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXNDO0FBRS9CLE1BQU1DLEdBQUcsR0FBR0Qsb0RBQWMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvc2VydmljZXMvYXBpQ2xpZW50LnRzPzdkMDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0dXBBUElDbGllbnQgfSBmcm9tICcuL2FwaSdcclxuXHJcbmV4cG9ydCBjb25zdCBhcGkgPSBzZXR1cEFQSUNsaWVudCgpIl0sIm5hbWVzIjpbInNldHVwQVBJQ2xpZW50IiwiYXBpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/services/apiClient.ts\n");

/***/ }),

/***/ "./src/services/errors/AuthTokenError.ts":
/*!***********************************************!*\
  !*** ./src/services/errors/AuthTokenError.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthTokenError\": () => (/* binding */ AuthTokenError)\n/* harmony export */ });\nclass AuthTokenError extends Error {\n    constructor(){\n        super(\"Error with authentication token.\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvZXJyb3JzL0F1dGhUb2tlbkVycm9yLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxjQUFjLFNBQVNDLEtBQUs7SUFDckNDLGFBQWE7UUFDVCxLQUFLLENBQUMsa0NBQWtDLENBQUM7S0FDNUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvc2VydmljZXMvZXJyb3JzL0F1dGhUb2tlbkVycm9yLnRzPzIzZWIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEF1dGhUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcignRXJyb3Igd2l0aCBhdXRoZW50aWNhdGlvbiB0b2tlbi4nKVxyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbIkF1dGhUb2tlbkVycm9yIiwiRXJyb3IiLCJjb25zdHJ1Y3RvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/services/errors/AuthTokenError.ts\n");

/***/ }),

/***/ "./node_modules/react-toastify/dist/ReactToastify.css":
/*!************************************************************!*\
  !*** ./node_modules/react-toastify/dist/ReactToastify.css ***!
  \************************************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.scss":
/*!*****************************!*\
  !*** ./styles/globals.scss ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("nookies");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-toastify":
/*!*********************************!*\
  !*** external "react-toastify" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-toastify");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();