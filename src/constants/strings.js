import LocalizedStrings from "react-localization";
import vi from "../commons/locales/vn";
import Constants from ".";

const Strings = new LocalizedStrings({
    vi
});

Strings.setLanguage(Constants.DefaultLanguage);

export default Strings;
