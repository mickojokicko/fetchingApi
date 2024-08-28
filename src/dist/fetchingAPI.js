"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var dataFromLocalStorage = JSON.parse(localStorage.getItem("idData") || "[]");
var resultField = document.querySelector(".results");
var inputField = document.getElementById("inputField");
var findIdBtn = document.getElementById("findId");
//________________________Functions_____________________________________________________
function clearField() {
    inputField.value = "";
}
function keyboardHendler(event) {
    var key = event.key;
    if (key === "Enter")
        getDataFromApi();
}
function getDataFromApi() {
    var inputFieldValue = +inputField.value;
    var findId = function (numPost) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, fetchedData, usersDataStored, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("https://jsonplaceholder.typicode.com/posts/".concat(inputFieldValue))];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            throw new Error("Failed to fetch post with this id -> ".concat(inputFieldValue, ": error status -> ").concat(res.status));
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data = _a.sent();
                        fetchedData = {
                            userId: data.userId,
                            id: data.id,
                            title: data.title,
                            body: data.body,
                        };
                        usersDataStored = JSON.parse(localStorage.getItem("idData") || "[]");
                        usersDataStored.push(fetchedData);
                        localStorage.setItem("idData", JSON.stringify(usersDataStored));
                        // __________Clear FIelds and reload page____________________
                        window.location.reload();
                        clearField();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Error:", err_1);
                        alert(err_1.message);
                        clearField();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    findId(inputFieldValue);
}
function displayUi(fetchedData) {
    var dataPattern = document.createElement("div");
    dataPattern.setAttribute("data-id", fetchedData.id.toString());
    console.log(dataPattern.getAttribute("data-id"));
    dataPattern.innerHTML = "\n  <div class=\"results\">\n<p> <span> This is user's ID:</span> ".concat(fetchedData.userId, "\n<p> <span> This is id:</span> ").concat(fetchedData.id, "\n<p> <span>This is body:</span> ").concat(fetchedData.body, "\n<p> <span> This is title:</span> ").concat(fetchedData.title, " </p></br>\n<button class = \"resultsBtn\" id = \"btnDelete\">Delete</button>\n  </div>\n");
    dataPattern.classList.remove("displayNone");
    dataPattern.classList.add("result");
    resultField.appendChild(dataPattern);
}
// ______________Iteration throw LS objects ____________________
dataFromLocalStorage.forEach(function (item) {
    displayUi(item);
});
function deleteHendler(event) {
    var target = event.target;
    var parentDiv = target.closest(".result");
    if (target.id === "btnDelete") {
        if (parentDiv) {
            var idToDelete_1 = parentDiv.getAttribute("data-id");
            // Ukloni 'div' iz DOM-a
            parentDiv.remove();
            // Ukloni element iz localStorage
            var storedData = JSON.parse(localStorage.getItem("idData") || "[]");
            // Filtriraj niz da ukloniš obrisani element
            storedData = storedData.filter(function (item) { return item.id.toString() !== idToDelete_1; });
            // Ažuriraj localStorage sa novim nizom
            localStorage.setItem("idData", JSON.stringify(storedData));
        }
    }
    if (target.id === "btnEdit") {
        console.log("Mile");
    }
}
// ______________Events______________________
findIdBtn.addEventListener("click", getDataFromApi);
document.addEventListener("keydown", keyboardHendler);
resultField.addEventListener("click", deleteHendler);
