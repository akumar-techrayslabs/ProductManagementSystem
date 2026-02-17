var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function loadComponent(componentId, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(filePath);
            // console.log(response);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const html = yield response.text();
            // console.log(html);
            const container = document.getElementById(componentId);
            if (container) {
                container.innerHTML = html;
            }
        }
        catch (error) {
            console.error("Error loading component:", error);
        }
    });
}
//# sourceMappingURL=layout.js.map