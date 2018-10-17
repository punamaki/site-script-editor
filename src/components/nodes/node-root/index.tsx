import * as React from "react";
import NodeWrapper from "../../../components/nodes/node-wrapper";
import SDTextField from "../../../components/sd-text-field";
import {
  addListToTree,
  addNavLinkToTree,
  addTriggerFlowToTree,
  addSiteColumnToTree,
  addSiteColumnXMLToTree,
  addContentTypeToTree,
  addInstallSolutionToTree,
  addUserToTree,
  addRemoveNavLinkToTree
} from "../../../helpers";
import { INodeProps } from "../../../types";
import "./node-root.css";
import { IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";
import SDComboBox from "../../../components/sd-combo-box";

export default function NodeRoot(props: INodeProps) {
  var { treeData, setTreeAndScriptData } = props;
  var actionProps = {
    iconProps: {
      iconName: "MoreVertical"
    },
    menuProps: {
      shouldFocusOnMount: true,
      items: [
        {
          key: "newList",
          name: "Add a new list",
          onClick: () => addListToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newNavLink",
          name: "Add a navigation link",
          onClick: () => addNavLinkToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newRemoveNavLink",
          name: "Add a navigation link removal",
          onClick: () => addRemoveNavLinkToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newSiteColumn",
          name: "Add a new site column",
          onClick: () => addSiteColumnToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newSiteColumnXML",
          name: "Add a new XML site column",
          onClick: () => addSiteColumnXMLToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newContentType",
          name: "Add a new content type",
          onClick: () => addContentTypeToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newAddUser",
          name: "Add a user to a group",
          onClick: () => addUserToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newInstallSolution",
          name: "Add a solution installation",
          onClick: () =>
            addInstallSolutionToTree(treeData, setTreeAndScriptData)
        },
        {
          key: "newTriggerFlow",
          name: "Add a Flow trigger",
          onClick: () => addTriggerFlowToTree(treeData, setTreeAndScriptData)
        }
      ]
    },
    title: "Add"
  };
  var options: IComboBoxOption[] = [
    {
      key: "",
      text: ""
    },
    {
      key: "Disabled",
      text: "Disabled"
    },
    {
      key: "ExistingExternalUserSharingOnly",
      text: "ExistingExternalUserSharingOnly"
    },
    {
      key: "ExternalUserSharingOnly",
      text: "ExternalUserSharingOnly"
    },
    {
      key: "ExternalUserAndGuestSharing",
      text: "ExternalUserAndGuestSharing"
    }
  ];
  var optionsLocale: IComboBoxOption[] = [
    { text: "", key: "" },
    { text: "Afrikaans (1078)", key: "1078" },
    { text: "Albanian (1052)", key: "1052" },
    { text: "Amharic (1118)", key: "1118" },
    { text: "Arabic - Algeria (5121)", key: "5121" },
    { text: "Arabic - Bahrain (15361)", key: "15361" },
    { text: "Arabic - Egypt (3073)", key: "3073" },
    { text: "Arabic - Iraq (2049)", key: "2049" },
    { text: "Arabic - Jordan (11265)", key: "11265" },
    { text: "Arabic - Kuwait (13313)", key: "13313" },
    { text: "Arabic - Lebanon (12289)", key: "12289" },
    { text: "Arabic - Libya (4097)", key: "4097" },
    { text: "Arabic - Morocco (6145)", key: "6145" },
    { text: "Arabic - Oman (8193)", key: "8193" },
    { text: "Arabic - Qatar (16385)", key: "16385" },
    { text: "Arabic - Saudi Arabia (1025)", key: "1025" },
    { text: "Arabic - Syria (10241)", key: "10241" },
    { text: "Arabic - Tunisia (7169)", key: "7169" },
    { text: "Arabic - United Arab Emirates (14337)", key: "14337" },
    { text: "Arabic - Yemen (9217)", key: "9217" },
    { text: "Armenian (1067)", key: "1067" },
    { text: "Assamese (1101)", key: "1101" },
    { text: "Azeri - Cyrillic (2092)", key: "2092" },
    { text: "Azeri - Latin (1068)", key: "1068" },
    { text: "Basque (1069)", key: "1069" },
    { text: "Belarusian (1059)", key: "1059" },
    { text: "Bengali - Bangladesh (2117)", key: "2117" },
    { text: "Bengali - India (1093)", key: "1093" },
    { text: "Bosnian (5146)", key: "5146" },
    { text: "Bulgarian (1026)", key: "1026" },
    { text: "Burmese (1109)", key: "1109" },
    { text: "Catalan (1027)", key: "1027" },
    { text: "Chinese - China (2052)", key: "2052" },
    { text: "Chinese - Hong Kong SAR (3076)", key: "3076" },
    { text: "Chinese - Macau SAR (5124)", key: "5124" },
    { text: "Chinese - Singapore (4100)", key: "4100" },
    { text: "Chinese - Taiwan (1028)", key: "1028" },
    { text: "Croatian (1050)", key: "1050" },
    { text: "Czech (1029)", key: "1029" },
    { text: "Danish (1030)", key: "1030" },
    { text: "Divehi (dv)", key: "dv" },
    { text: "Dutch - Belgium (2067)", key: "2067" },
    { text: "Dutch - Netherlands (1043)", key: "1043" },
    { text: "Edo (1126)", key: "1126" },
    { text: "English - Australia (3081)", key: "3081" },
    { text: "English - Belize (10249)", key: "10249" },
    { text: "English - Canada (4105)", key: "4105" },
    { text: "English - Caribbean (9225)", key: "9225" },
    { text: "English - Great Britain (2057)", key: "2057" },
    { text: "English - India (16393)", key: "16393" },
    { text: "English - Ireland (6153)", key: "6153" },
    { text: "English - Jamaica (8201)", key: "8201" },
    { text: "English - New Zealand (5129)", key: "5129" },
    { text: "English - Phillippines (13321)", key: "13321" },
    { text: "English - Southern Africa (7177)", key: "7177" },
    { text: "English - Trinidad (11273)", key: "11273" },
    { text: "English - United States (1033)", key: "1033" },
    { text: "English - Zimbabwe (12297)", key: "12297" },
    { text: "Estonian (1061)", key: "1061" },
    { text: "FYRO Macedonia (1071)", key: "1071" },
    { text: "Faroese (1080)", key: "1080" },
    { text: "Farsi - Persian (1065)", key: "1065" },
    { text: "Filipino (1124)", key: "1124" },
    { text: "Finnish (1035)", key: "1035" },
    { text: "French - Belgium (2060)", key: "2060" },
    { text: "French - Cameroon (11276)", key: "11276" },
    { text: "French - Canada (3084)", key: "3084" },
    { text: "French - Congo (9228)", key: "9228" },
    { text: "French - Cote d'Ivoire (12300)", key: "12300" },
    { text: "French - France (1036)", key: "1036" },
    { text: "French - Luxembourg (5132)", key: "5132" },
    { text: "French - Mali (13324)", key: "13324" },
    { text: "French - Monaco (6156)", key: "6156" },
    { text: "French - Morocco (14348)", key: "14348" },
    { text: "French - Senegal (10252)", key: "10252" },
    { text: "French - Switzerland (4108)", key: "4108" },
    { text: "French - West Indies (7180)", key: "7180" },
    { text: "Frisian - Netherlands (1122)", key: "1122" },
    { text: "Gaelic - Ireland (2108)", key: "2108" },
    { text: "Gaelic - Scotland (1084)", key: "1084" },
    { text: "Galician (1110)", key: "1110" },
    { text: "Georgian (1079)", key: "1079" },
    { text: "German - Austria (3079)", key: "3079" },
    { text: "German - Germany (1031)", key: "1031" },
    { text: "German - Liechtenstein (5127)", key: "5127" },
    { text: "German - Luxembourg (4103)", key: "4103" },
    { text: "German - Switzerland (2055)", key: "2055" },
    { text: "Greek (1032)", key: "1032" },
    { text: "Guarani - Paraguay (1140)", key: "1140" },
    { text: "Gujarati (1095)", key: "1095" },
    { text: "HID (Human Interface Device) (1279)", key: "1279" },
    { text: "Hebrew (1037)", key: "1037" },
    { text: "Hindi (1081)", key: "1081" },
    { text: "Hungarian (1038)", key: "1038" },
    { text: "Icelandic (1039)", key: "1039" },
    { text: "Igbo - Nigeria (1136)", key: "1136" },
    { text: "Indonesian (1057)", key: "1057" },
    { text: "Italian - Italy (1040)", key: "1040" },
    { text: "Italian - Switzerland (2064)", key: "2064" },
    { text: "Japanese (1041)", key: "1041" },
    { text: "Kannada (1099)", key: "1099" },
    { text: "Kashmiri (1120)", key: "1120" },
    { text: "Kazakh (1087)", key: "1087" },
    { text: "Khmer (1107)", key: "1107" },
    { text: "Konkani (1111)", key: "1111" },
    { text: "Korean (1042)", key: "1042" },
    { text: "Kyrgyz - Cyrillic (1088)", key: "1088" },
    { text: "Lao (1108)", key: "1108" },
    { text: "Latin (1142)", key: "1142" },
    { text: "Latvian (1062)", key: "1062" },
    { text: "Lithuanian (1063)", key: "1063" },
    { text: "Malay - Brunei (2110)", key: "2110" },
    { text: "Malay - Malaysia (1086)", key: "1086" },
    { text: "Malayalam (1100)", key: "1100" },
    { text: "Maltese (1082)", key: "1082" },
    { text: "Manipuri (1112)", key: "1112" },
    { text: "Maori (1153)", key: "1153" },
    { text: "Marathi (1102)", key: "1102" },
    { text: "Mongolian (2128)", key: "2128" },
    { text: "Mongolian (1104)", key: "1104" },
    { text: "Nepali (1121)", key: "1121" },
    { text: "Norwegian - Bokml (1044)", key: "1044" },
    { text: "Norwegian - Nynorsk (2068)", key: "2068" },
    { text: "Oriya (1096)", key: "1096" },
    { text: "Polish (1045)", key: "1045" },
    { text: "Portuguese - Brazil (1046)", key: "1046" },
    { text: "Portuguese - Portugal (2070)", key: "2070" },
    { text: "Punjabi (1094)", key: "1094" },
    { text: "Raeto-Romance (1047)", key: "1047" },
    { text: "Romanian - Moldova (2072)", key: "2072" },
    { text: "Romanian - Romania (1048)", key: "1048" },
    { text: "Russian (1049)", key: "1049" },
    { text: "Russian - Moldova (2073)", key: "2073" },
    { text: "Sami Lappish (1083)", key: "1083" },
    { text: "Sanskrit (1103)", key: "1103" },
    { text: "Serbian - Cyrillic (3098)", key: "3098" },
    { text: "Serbian - Latin (2074)", key: "2074" },
    { text: "Sesotho (Sutu) (1072)", key: "1072" },
    { text: "Setsuana (1074)", key: "1074" },
    { text: "Sindhi (1113)", key: "1113" },
    { text: "Sinhala (si)", key: "si" },
    { text: "Slovak (1051)", key: "1051" },
    { text: "Slovenian (1060)", key: "1060" },
    { text: "Somali (1143)", key: "1143" },
    { text: "Sorbian (1070)", key: "1070" },
    { text: "Spanish - Argentina (11274)", key: "11274" },
    { text: "Spanish - Bolivia (16394)", key: "16394" },
    { text: "Spanish - Chile (13322)", key: "13322" },
    { text: "Spanish - Colombia (9226)", key: "9226" },
    { text: "Spanish - Costa Rica (5130)", key: "5130" },
    { text: "Spanish - Dominican Republic (7178)", key: "7178" },
    { text: "Spanish - Ecuador (12298)", key: "12298" },
    { text: "Spanish - El Salvador (17418)", key: "17418" },
    { text: "Spanish - Guatemala (4106)", key: "4106" },
    { text: "Spanish - Honduras (18442)", key: "18442" },
    { text: "Spanish - Mexico (2058)", key: "2058" },
    { text: "Spanish - Nicaragua (19466)", key: "19466" },
    { text: "Spanish - Panama (6154)", key: "6154" },
    { text: "Spanish - Paraguay (15370)", key: "15370" },
    { text: "Spanish - Peru (10250)", key: "10250" },
    { text: "Spanish - Puerto Rico (20490)", key: "20490" },
    { text: "Spanish - Spain (Traditional) (1034)", key: "1034" },
    { text: "Spanish - Uruguay (14346)", key: "14346" },
    { text: "Spanish - Venezuela (8202)", key: "8202" },
    { text: "Swahili (1089)", key: "1089" },
    { text: "Swedish - Finland (2077)", key: "2077" },
    { text: "Swedish - Sweden (1053)", key: "1053" },
    { text: "Syriac (1114)", key: "1114" },
    { text: "Tajik (1064)", key: "1064" },
    { text: "Tamil (1097)", key: "1097" },
    { text: "Tatar (1092)", key: "1092" },
    { text: "Telugu (1098)", key: "1098" },
    { text: "Thai (1054)", key: "1054" },
    { text: "Tibetan (1105)", key: "1105" },
    { text: "Tsonga (1073)", key: "1073" },
    { text: "Turkish (1055)", key: "1055" },
    { text: "Turkmen (1090)", key: "1090" },
    { text: "Ukrainian (1058)", key: "1058" },
    { text: "Unicode (0)", key: "0" },
    { text: "Urdu (1056)", key: "1056" },
    { text: "Uzbek - Cyrillic (2115)", key: "2115" },
    { text: "Uzbek - Latin (1091)", key: "1091" },
    { text: "Venda (1075)", key: "1075" },
    { text: "Vietnamese (1066)", key: "1066" },
    { text: "Welsh (1106)", key: "1106" },
    { text: "Xhosa (1076)", key: "1076" },
    { text: "Yiddish (1085)", key: "1085" },
    { text: "Zulu (1077)", key: "1077" }
  ];
  var optionsHourFormat: IComboBoxOption[] = [
    {
      key: "",
      text: ""
    },
    {
      key: "24",
      text: "24"
    },
    {
      key: "12",
      text: "12"
    }
  ];
  var optionsSortOrder: IComboBoxOption[] = [
    {
      key: "",
      text: ""
    },
    {
      key: "6",
      text: "6"
    },
    {
      key: "25",
      text: "Default (25)"
    }
  ];
  var optionsTimeZone: IComboBoxOption[] = [
    { text: "", key: ""},
    { text: "Greenwich Mean and Universal Coordinated Time (0)", key: "0"},
    { text: "European Central Time (+1:00)", key: "1"},
    { text: "Eastern European, Egypt Standard Time (+2:00)", key: "2"},
    { text: "Eastern African Time (+3:00)", key: "3"},
    { text: "Middle East Time (+3:30)", key: "3.5"},
    { text: "Near East Time (+4:00)", key: "4"},
    { text: "Pakistan Lahore Time (+5:00)", key: "5"},
    { text: "India Standard Time (+5:30)", key: "5.5"},
    { text: "Bangladesh Standard Time (+6:00)", key: "6"},
    { text: "Vietnam Standard Time (+7:00)", key: "7"},
    { text: "China Taiwan Time (+8:00)", key: "8"},
    { text: "Japan Standard Time (+9:00)", key: "9"},
    { text: "Australia Central Time (+9:30)", key: "9.5"},
    { text: "Australia Eastern Time (+10:00)", key: "10"},
    { text: "Solomon Standard Time (+11:00)", key: "11"},
    { text: "New Zealand Standard Time (+12:00)", key: "12"},
    { text: "Midway Islands Time (-11:00)", key: "-11"},
    { text: "Hawaii Standard Time (-10:00)", key: "-10"},
    { text: "Alaska Standard Time (-9:00)", key: "-9"},
    { text: "Pacific Standard Time (-8:00)", key: "-8"},
    { text: "Mountain, Phoenix Standard Time (-7:00)", key: "-7"},
    { text: "Central Standard Time (-6:00)", key: "-6"},
    { text: "Indiana and Eastern Standard Time (-5:00)", key: "-5"},
    { text: "Puerto Rico and US Virgin Islands Time (-4:00)", key: "-4"},
    { text: "Canada Newfoundland Time (-3:30)", key: "-3.5"},
    { text: "Argentina Standard, Brazil Eastern Time (-3:00)", key: "-3"},
    { text: "Central African Time (-1:00)", key: "-1"}
  ];

    var convertToNumberProps = {...props, convertToNumber:true}
  return (
    <NodeWrapper actionProps={actionProps} smallTitle="Home">
      <div className="sd_site_hierarchy_node_root">
        {/* <div>
          <SDTextField {...props} label="Title" fieldName="title" />
        </div> */}
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField {...props} label="Theme" fieldName="themeName" />
          </div>
          <div className="sd_col_50">
            <SDTextField {...props} label="Logo url" fieldName="url" />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
            <SDTextField {...props} label="Hub site id" fieldName="hubSiteId" />
          </div>
          <div className="sd_col_50">
            <SDComboBox
              {...props}
              label="Manage guest access"
              fieldName="capability"
              options={options}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
          <SDComboBox
              {...convertToNumberProps}
              label="Time zone"
              fieldName="timeZone"
              options={optionsTimeZone}
            />
          </div>
          <div className="sd_col_50">
            <SDComboBox
              {...convertToNumberProps}
              label="Locale"
              fieldName="locale"
              options={optionsLocale}
            />
          </div>
        </div>
        <div className="sd_row">
          <div className="sd_col_50">
           <SDComboBox
            {...convertToNumberProps}
            label="Sort order"
            fieldName="sortOrder"
            options={optionsSortOrder}
          />
          </div>
          <div className="sd_col_50">
            <SDComboBox
              {...props}
              label="Hour format"
              fieldName="hourFormat"
              options={optionsHourFormat}
            />
          </div>
        </div>
      </div>
    </NodeWrapper>
  );
}
