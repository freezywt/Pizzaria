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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthContext\": () => (/* binding */ AuthContext),\n/* harmony export */   \"AuthProvider\": () => (/* binding */ AuthProvider),\n/* harmony export */   \"signOut\": () => (/* binding */ signOut)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _services_apiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/apiClient */ \"./src/services/apiClient.ts\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nfunction signOut() {\n    try {\n        (0,nookies__WEBPACK_IMPORTED_MODULE_3__.destroyCookie)(undefined, \"@nextauth.token\");\n        next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/\");\n    } catch  {\n    //erro ao deslogar\n    }\n}\nfunction AuthProvider({ children  }) {\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const { \"@nextauth.token\": token  } = (0,nookies__WEBPACK_IMPORTED_MODULE_3__.parseCookies)();\n        if (token) {\n            _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.get(\"/me\").then((response)=>{\n                const { id , name , email  } = response.data;\n                setUser({\n                    id,\n                    name,\n                    email\n                });\n            }).catch(()=>{\n                signOut();\n            });\n        }\n    }, []);\n    const { 0: user , 1: setUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    const isAuthenticated = !!user;\n    async function signIn({ email , password  }) {\n        try {\n            const response = await _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.post(\"/session\", {\n                email,\n                password\n            });\n            const { id , name , token  } = response.data;\n            (0,nookies__WEBPACK_IMPORTED_MODULE_3__.setCookie)(undefined, \"@nextauth.token\", token, {\n                maxAge: 60 * 60 * 24 * 30,\n                path: \"/\"\n            });\n            setUser({\n                id,\n                name,\n                email\n            });\n            _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.defaults.headers.Authorization = `Bearer ${token}`;\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(\"Logado com sucesso\");\n            next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/dashboard\");\n        } catch (err) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(\"Erro ao acessar\");\n            console.log(\"Erro ao acessar\", err);\n        }\n    }\n    async function signUp({ name , email , password  }) {\n        try {\n            const response = await _services_apiClient__WEBPACK_IMPORTED_MODULE_2__.api.post(\"/users\", {\n                name,\n                email,\n                password\n            });\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(\"Conta criada com sucesso\");\n            next_router__WEBPACK_IMPORTED_MODULE_4___default().push(\"/\");\n        } catch (err) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(\"Erro ao cadastrar\");\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            isAuthenticated,\n            signIn,\n            signOut,\n            signUp\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/home/freezy/Coding/Pizzaria/web/src/contexts/AuthContext.tsx\",\n        lineNumber: 124,\n        columnNumber: 9\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVcsQ0FBQytCLFFBQVE7UUFBQ0MsS0FBSyxFQUFFO1lBQUVoQixJQUFJO1lBQUVDLGVBQWU7WUFBRUMsTUFBTTtZQUFFakIsT0FBTztZQUFFNkIsTUFBTTtTQUFFO2tCQUMxRXpCLFFBQVE7Ozs7O1lBQ1UsQ0FDMUI7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvY29udGV4dHMvQXV0aENvbnRleHQudHN4PzFmYTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgUmVhY3ROb2RlLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IGFwaSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaUNsaWVudCdcblxuaW1wb3J0IHsgZGVzdHJveUNvb2tpZSwgc2V0Q29va2llLCBwYXJzZUNvb2tpZXMgfSBmcm9tICdub29raWVzJ1xuaW1wb3J0IFJvdXRlciBmcm9tICduZXh0L3JvdXRlcidcblxuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSdcblxudHlwZSBBdXRoQ29udGV4dERhdGEgPSB7XG4gICAgdXNlcjogVXNlclByb3BzLFxuICAgIGlzQXV0aGVudGljYXRlZDogYm9vbGVhbixcbiAgICBzaWduSW46IChjcmVkZW50aWFsczogU2lnbkluUHJvcHMpID0+IFByb21pc2U8dm9pZD5cbiAgICBzaWduT3V0OiAoKSA9PiB2b2lkXG4gICAgc2lnblVwOiAoY3JlZGVudGlhbHM6IFNpZ25VcFByb3BzKSA9PiBQcm9taXNlPHZvaWQ+XG59XG5cbnR5cGUgVXNlclByb3BzID0ge1xuICAgIGlkOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGVtYWlsOiBzdHJpbmcsXG59XG5cbnR5cGUgU2lnbkluUHJvcHMgPSB7XG4gICAgZW1haWw6IHN0cmluZyxcbiAgICBwYXNzd29yZDogc3RyaW5nLFxufVxuXG50eXBlIFNpZ25VcFByb3BzID0ge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICBlbWFpbDogc3RyaW5nLFxuICAgIHBhc3N3b3JkOiBzdHJpbmcsXG59XG5cbnR5cGUgQXV0aFByb3ZpZGVyUHJvcHMgPSB7XG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZSxcbn1cblxuZXhwb3J0IGNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh7fSBhcyBBdXRoQ29udGV4dERhdGEpXG5cbmV4cG9ydCBmdW5jdGlvbiBzaWduT3V0KCkge1xuICAgIHRyeSB7XG4gICAgICAgIGRlc3Ryb3lDb29raWUodW5kZWZpbmVkLCAnQG5leHRhdXRoLnRva2VuJylcbiAgICAgICAgUm91dGVyLnB1c2goJy8nKVxuICAgIH1cbiAgICBjYXRjaCB7XG4gICAgICAgIC8vZXJybyBhbyBkZXNsb2dhclxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH06IEF1dGhQcm92aWRlclByb3BzKSB7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCB7ICdAbmV4dGF1dGgudG9rZW4nOiB0b2tlbiB9ID0gcGFyc2VDb29raWVzKClcblxuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIGFwaS5nZXQoJy9tZScpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGlkLCBuYW1lLCBlbWFpbCB9ID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2lnbk91dCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sIFtdKVxuXG4gICAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlclByb3BzPigpXG4gICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gISF1c2VyXG5cbiAgICBhc3luYyBmdW5jdGlvbiBzaWduSW4oeyBlbWFpbCwgcGFzc3dvcmQgfTogU2lnbkluUHJvcHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnBvc3QoJy9zZXNzaW9uJywge1xuICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgeyBpZCwgbmFtZSwgdG9rZW4gfSA9IHJlc3BvbnNlLmRhdGFcblxuICAgICAgICAgICAgc2V0Q29va2llKHVuZGVmaW5lZCwgJ0BuZXh0YXV0aC50b2tlbicsIHRva2VuLCB7XG4gICAgICAgICAgICAgICAgbWF4QWdlOiA2MCAqIDYwICogMjQgKiAzMCwgLy8gZXhwaXJlIGluIDEgbW9udGhcbiAgICAgICAgICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBzZXRVc2VyKHtcbiAgICAgICAgICAgICAgICBpZCxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgYXBpLmRlZmF1bHRzLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gXG5cbiAgICAgICAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0xvZ2FkbyBjb20gc3VjZXNzbycpXG5cbiAgICAgICAgICAgIFJvdXRlci5wdXNoKCcvZGFzaGJvYXJkJylcblxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHRvYXN0LmVycm9yKCdFcnJvIGFvIGFjZXNzYXInKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvIGFvIGFjZXNzYXJcIiwgZXJyKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gc2lnblVwKHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkIH06IFNpZ25VcFByb3BzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KCcvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRvYXN0LnN1Y2Nlc3MoJ0NvbnRhIGNyaWFkYSBjb20gc3VjZXNzbycpXG4gICAgICAgICAgICBSb3V0ZXIucHVzaCgnLycpXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoJ0Vycm8gYW8gY2FkYXN0cmFyJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17eyB1c2VyLCBpc0F1dGhlbnRpY2F0ZWQsIHNpZ25Jbiwgc2lnbk91dCwgc2lnblVwIH19PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxuICAgIClcbn0iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiYXBpIiwiZGVzdHJveUNvb2tpZSIsInNldENvb2tpZSIsInBhcnNlQ29va2llcyIsIlJvdXRlciIsInRvYXN0IiwiQXV0aENvbnRleHQiLCJzaWduT3V0IiwidW5kZWZpbmVkIiwicHVzaCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidG9rZW4iLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJpZCIsIm5hbWUiLCJlbWFpbCIsImRhdGEiLCJzZXRVc2VyIiwiY2F0Y2giLCJ1c2VyIiwiaXNBdXRoZW50aWNhdGVkIiwic2lnbkluIiwicGFzc3dvcmQiLCJwb3N0IiwibWF4QWdlIiwicGF0aCIsImRlZmF1bHRzIiwiaGVhZGVycyIsInN1Y2Nlc3MiLCJlcnIiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzaWduVXAiLCJQcm92aWRlciIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/contexts/AuthContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/globals.scss */ \"./styles/globals.scss\");\n/* harmony import */ var _styles_globals_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ \"react-toastify\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.css */ \"./node_modules/react-toastify/dist/ReactToastify.css\");\n/* harmony import */ var react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_4__.AuthProvider, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"/home/freezy/Coding/Pizzaria/web/src/pages/_app.tsx\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_toastify__WEBPACK_IMPORTED_MODULE_2__.ToastContainer, {\n                autoClose: 3000\n            }, void 0, false, {\n                fileName: \"/home/freezy/Coding/Pizzaria/web/src/pages/_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/freezy/Coding/Pizzaria/web/src/pages/_app.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQWtDO0FBRWE7QUFDRDtBQUVRO0FBRXRELFNBQVNFLEtBQUssQ0FBQyxFQUFFQyxTQUFTLEdBQUVDLFNBQVMsR0FBWSxFQUFFO0lBQ2pELHFCQUNFLDhEQUFDSCwrREFBWTs7MEJBQ1gsOERBQUNFLFNBQVM7Z0JBQUUsR0FBR0MsU0FBUzs7Ozs7b0JBQUk7MEJBQzVCLDhEQUFDSiwwREFBYztnQkFBQ0ssU0FBUyxFQUFFLElBQUk7Ozs7O29CQUFHOzs7Ozs7WUFDckIsQ0FDaEI7Q0FDRjtBQUVELGlFQUFlSCxLQUFLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvdGVuZC8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vLi4vc3R5bGVzL2dsb2JhbHMuc2NzcydcbmltcG9ydCB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgeyBUb2FzdENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5J1xuaW1wb3J0ICdyZWFjdC10b2FzdGlmeS9kaXN0L1JlYWN0VG9hc3RpZnkuY3NzJ1xuXG5pbXBvcnQgeyBBdXRoUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0cy9BdXRoQ29udGV4dCdcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxBdXRoUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+IFxuICAgICAgPFRvYXN0Q29udGFpbmVyIGF1dG9DbG9zZT17MzAwMH0vPlxuICAgIDwvQXV0aFByb3ZpZGVyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwXG4iXSwibmFtZXMiOlsiVG9hc3RDb250YWluZXIiLCJBdXRoUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImF1dG9DbG9zZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setupAPIClient\": () => (/* binding */ setupAPIClient)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _errors_AuthTokenError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors/AuthTokenError */ \"./src/services/errors/AuthTokenError.ts\");\n/* harmony import */ var _contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/AuthContext */ \"./src/contexts/AuthContext.tsx\");\n\n\n\n\nfunction setupAPIClient(ctx = undefined) {\n    let cookies = (0,nookies__WEBPACK_IMPORTED_MODULE_1__.parseCookies)(ctx);\n    const api = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n        baseURL: \"http://localhost:1337\",\n        headers: {\n            Authorization: `Bearer ${cookies[\"@nextauth.token\"]}`\n        }\n    });\n    api.interceptors.response.use((response)=>{\n        return response;\n    }, (error)=>{\n        if (error.response.status === 401) {\n            if (true) {\n                (0,_contexts_AuthContext__WEBPACK_IMPORTED_MODULE_3__.signOut)();\n            } else {}\n        }\n        return Promise.reject(error);\n    });\n    return api;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBeUM7QUFDSDtBQUNrQjtBQUVQO0FBRTFDLFNBQVNJLGNBQWMsQ0FBQ0MsR0FBRyxHQUFHQyxTQUFTLEVBQUU7SUFDNUMsSUFBSUMsT0FBTyxHQUFHTixxREFBWSxDQUFDSSxHQUFHLENBQUM7SUFFL0IsTUFBTUcsR0FBRyxHQUFHUixtREFBWSxDQUFDO1FBQ3JCVSxPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDQyxPQUFPLEVBQUU7WUFDTEMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFTCxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0tBQ0osQ0FBQztJQUVGQyxHQUFHLENBQUNLLFlBQVksQ0FBQ0MsUUFBUSxDQUFDQyxHQUFHLENBQUNELENBQUFBLFFBQVEsR0FBSTtRQUN0QyxPQUFPQSxRQUFRO0tBQ2xCLEVBQUUsQ0FBQ0UsS0FBaUIsR0FBSztRQUN0QixJQUFJQSxLQUFLLENBQUNGLFFBQVEsQ0FBQ0csTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUMvQixJQUFJLElBQTJCLEVBQUU7Z0JBQzdCZCw4REFBTyxFQUFFO2FBQ1osTUFBTSxFQUVOO1NBQ0o7UUFFRCxPQUFPZSxPQUFPLENBQUNDLE1BQU0sQ0FBQ0gsS0FBSyxDQUFDO0tBQy9CLENBQUM7SUFFRixPQUFPUixHQUFHO0NBQ2IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm90ZW5kLy4vc3JjL3NlcnZpY2VzL2FwaS50cz85NTZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnXG5pbXBvcnQgeyBwYXJzZUNvb2tpZXMgfSBmcm9tICdub29raWVzJ1xuaW1wb3J0IHsgQXV0aFRva2VuRXJyb3IgfSBmcm9tICcuL2Vycm9ycy9BdXRoVG9rZW5FcnJvcidcblxuaW1wb3J0IHsgc2lnbk91dCB9IGZyb20gJy4uL2NvbnRleHRzL0F1dGhDb250ZXh0J1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBBUElDbGllbnQoY3R4ID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IGNvb2tpZXMgPSBwYXJzZUNvb2tpZXMoY3R4KVxuXG4gICAgY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICAgICAgYmFzZVVSTDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNycsIC8vcHV0IHlvdXIgYXBpIHVybFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7Y29va2llc1snQG5leHRhdXRoLnRva2VuJ119YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGFwaS5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfSwgKGVycm9yOiBBeGlvc0Vycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHNpZ25PdXQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEF1dGhUb2tlbkVycm9yKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXG4gICAgfSlcblxuICAgIHJldHVybiBhcGlcbn0iXSwibmFtZXMiOlsiYXhpb3MiLCJwYXJzZUNvb2tpZXMiLCJBdXRoVG9rZW5FcnJvciIsInNpZ25PdXQiLCJzZXR1cEFQSUNsaWVudCIsImN0eCIsInVuZGVmaW5lZCIsImNvb2tpZXMiLCJhcGkiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJpbnRlcmNlcHRvcnMiLCJyZXNwb25zZSIsInVzZSIsImVycm9yIiwic3RhdHVzIiwiUHJvbWlzZSIsInJlamVjdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/services/api.ts\n");

/***/ }),

/***/ "./src/services/apiClient.ts":
/*!***********************************!*\
  !*** ./src/services/apiClient.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/services/api.ts\");\n\nconst api = (0,_api__WEBPACK_IMPORTED_MODULE_0__.setupAPIClient)();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvYXBpQ2xpZW50LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQXNDO0FBRS9CLE1BQU1DLEdBQUcsR0FBR0Qsb0RBQWMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvc2VydmljZXMvYXBpQ2xpZW50LnRzPzdkMDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0dXBBUElDbGllbnQgfSBmcm9tICcuL2FwaSdcblxuZXhwb3J0IGNvbnN0IGFwaSA9IHNldHVwQVBJQ2xpZW50KCkiXSwibmFtZXMiOlsic2V0dXBBUElDbGllbnQiLCJhcGkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/apiClient.ts\n");

/***/ }),

/***/ "./src/services/errors/AuthTokenError.ts":
/*!***********************************************!*\
  !*** ./src/services/errors/AuthTokenError.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthTokenError\": () => (/* binding */ AuthTokenError)\n/* harmony export */ });\nclass AuthTokenError extends Error {\n    constructor(){\n        super(\"Error with authentication token.\");\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VydmljZXMvZXJyb3JzL0F1dGhUb2tlbkVycm9yLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxjQUFjLFNBQVNDLEtBQUs7SUFDckNDLGFBQWE7UUFDVCxLQUFLLENBQUMsa0NBQWtDLENBQUM7S0FDNUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb3RlbmQvLi9zcmMvc2VydmljZXMvZXJyb3JzL0F1dGhUb2tlbkVycm9yLnRzPzIzZWIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEF1dGhUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCdFcnJvciB3aXRoIGF1dGhlbnRpY2F0aW9uIHRva2VuLicpXG4gICAgfVxufSJdLCJuYW1lcyI6WyJBdXRoVG9rZW5FcnJvciIsIkVycm9yIiwiY29uc3RydWN0b3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/services/errors/AuthTokenError.ts\n");

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