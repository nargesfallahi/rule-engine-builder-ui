/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React from "react";
import merge from "lodash/merge";
import {
  BasicConfig, Utils,
  // types:
  Operators, Widgets, Fields, Config, Types, Conjunctions, Settings, LocaleSettings, Funcs,
} from "react-awesome-query-builder";
import ru_RU from "antd/lib/locale-provider/ru_RU";
import { ruRU } from "@material-ui/core/locale";
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import AntdWidgets from "react-awesome-query-builder/lib/components/widgets/antd";
import MaterialConfig from "react-awesome-query-builder/lib/config/material";
const {
  FieldSelect,
  FieldDropdown,
  FieldCascader,
  FieldTreeSelect,
} = AntdWidgets;
const InitialConfig = AntdConfig; // or BasicConfig or MaterialConfig

//////////////////////////////////////////////////////////////////////

const fields: Fields = {
  WITHDRAWAL_DESTINATION_BANK_ACCOUNT_COUNTRY: {
    label: "WITHDRAWAL_DESTINATION_BANK_ACCOUNT_COUNTRY",
    type: "text",
    excludeOperators: ["proximity"],
    fieldSettings: {
      validateValue: (val: string, fieldSettings) => {
        return (val.length <= 2);
      },
    },
  },
  KYC_COUNTRY: {
    label: "KYC_COUNTRY",
    type: "treeselect",
    fieldSettings: {
      listValues: {
        RU: "RU",
        IE: "IE",
        PL: "PL",
        PT: "PT",
        LV: "LV",
        KZ: "KZ",
        CZ: "CZ",
        DE: "DE",
        ID: "ID",
      },
      allowCustomValues: true
    },
  },
  LAST_10_DAY_PLAYER_SOLD: {
    label: "LAST_10_DAY_PLAYER_SOLD",
    type: "text",
    fieldSettings: {
      listValues: {
        LaMelo: "LaMelo Ball",
        Luka: "Luka Dončić",
        Zion: "Zion Williamson",
        lebron: "LeBron James",
        steph: "Steph Curry",
        wilson: "A\'ja Wilson",
      },
      allowCustomValues: true
    }
  },
  ACCOUNT_LASTNAME_NORMALIZED: {
    label: "ACCOUNT_LASTNAME_NORMALIZED",
    type: "text",
    excludeOperators: ["proximity"],
    fieldSettings: {
      validateValue: (val: string, fieldSettings) => {
        return (val.length <= 200);
      },
    },
  },
  ACCOUNT_FIRSTNAME_NORMALIZED: {
    label: "ACCOUNT_FIRSTNAME_NORMALIZED",
    type: "text",
    excludeOperators: ["proximity"],
    fieldSettings: {
      validateValue: (val: string, fieldSettings) => {
        return (val.length <= 200);
      },
    },
  },
  KYC_LASTNAME_NORMALIZED: {
    label: "KYC_LASTNAME_NORMALIZED",
    type: "text",
    excludeOperators: ["proximity"],
    fieldSettings: {
      validateValue: (val: string, fieldSettings) => {
        return (val.length <= 200);
      },
    },
  },
  KYC_FIRSTNAME_NORMALIZED: {
    label: "KYC_FIRSTNAME_NORMALIZED",
    type: "text",
    excludeOperators: ["proximity"],
    fieldSettings: {
      validateValue: (val: string, fieldSettings) => {
        return (val.length <= 200);
      },
    },
  },
  LAST_10_DAY_MOMENT_TIER_SOLD: {
    label: "LAST_10_DAY_MOMENT_TIER_SOLD",
    type: "text",
    fieldSettings: {
      listValues: {
        LaMelo: "LaMelo Ball",
        Luka: "Luka Dončić",
        Zion: "Zion Williamson",
        lebron: "LeBron James",
        steph: "Steph Curry",
        wilson: "A\'ja Wilson",
      },
      allowCustomValues: true
    }
  },
  WITHDRAW_AMOUNT_CENTS: {
    label: "LAST_24_HR_WITHDRAWAL_REQUESTED_COUNT",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  LAST_10_DAY_P2P_SOLD_AMOUNT_CENTS: {
    label: "LAST_10_DAY_P2P_SOLD_AMOUNT_CENTS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  LAST_48HR_ONRAMP_SUM_CENTS: {
    label: "LAST_48HR_ONRAMP_SUM_CENTS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  LAST_24_HR_WITHDRAWAL_REQUESTED_COUNT: {
    label: "LAST_24_HR_WITHDRAWAL_REQUESTED_COUNT",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  LAST_10_DAY_MIN_SERIAL_SOLD: {
    label: "LAST_10_DAY_MIN_SERIAL_SOLD",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  FIRST_SUCCESSFUL_FIAT_TRANSACTION_AGE_SECONDS: {
    label: "FIRST_SUCCESSFUL_FIAT_TRANSACTION_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  USER_IN_VELOCITY_ON_RAMP_LIST_AGE_SECONDS: {
    label: "USER_IN_VELOCITY_ON_RAMP_LIST_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  LAST_EMAIL_CHANGE_AGE_SECONDS: {
    label: "LAST_EMAIL_CHANGE_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  TWOFA_UPDATE_AGE_SECONDS: {
    label: "TWOFA_UPDATE_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  USER_SIFT_GREEN_LABEL_AGE_SECONDS: {
    label: "USER_SIFT_GREEN_LABEL_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  SIFT_DECISION_AGE_SECONDS: {
    label: "SIFT_DECISION_AGE_SECONDS",
    type: "number",
    preferWidgets: ["number"],
    fieldSettings: {
      min: 0
    },
  },
  IS_ACH_WITHDRAWAL: {
    label: "IS_ACH_WITHDRAWAL",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_ON_HOLD_WITHDRAWAL_LIST: {
    label: "IS_ON_HOLD_WITHDRAWAL_LIST",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_ON_VELOCITY_ON_RAMP_LIST: {
    label: "IS_ON_VELOCITY_ON_RAMP_LIST",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },  
  IS_ON_EDD_LIST: {
    label: "IS_ON_EDD_LIST",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_WIRE_WITHDRAWAL: {
    label: "IS_WIRE_WITHDRAWAL",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },  
  SOMEONE_ELSE_HAS_USED_WITHDRAWAL_DESTINATION: {
    label: "SOMEONE_ELSE_HAS_USED_WITHDRAWAL_DESTINATION",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  USER_HAS_USED_WITHDRAWAL_DESTINATION: {
    label: "USER_HAS_USED_WITHDRAWAL_DESTINATION",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  INSTANT_WITHDRAWAL_SKIP_SHADOW_MODE: {
    label: "INSTANT_WITHDRAWAL_SKIP_SHADOW_MODE",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_CONSIDERED_HIGH_RISK_CRYPTO_WITHDRAWAL: {
    label: "IS_CONSIDERED_HIGH_RISK_CRYPTO_WITHDRAWAL",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_USDC_WITHDRAWAL: {
    label: "IS_USDC_WITHDRAWAL",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  USER_HAS_SIFT_GREEN_LABEL: {
    label: "USER_HAS_SIFT_GREEN_LABEL",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_READONLY: {
    label: "IS_READONLY",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_BLOCKED: {
    label: "IS_BLOCKED",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
  IS_ON_VIP_LIST: {
    label: "IS_ON_VIP_LIST",
    type: "boolean",
    defaultValue: false,
    mainWidgetProps: {
      labelYes: "+",
      labelNo: "-"
    }
  },
};


//////////////////////////////////////////////////////////////////////

const conjunctions: Conjunctions = {
  AND: InitialConfig.conjunctions.AND,
  OR: InitialConfig.conjunctions.OR,
};

const operators: Operators = {
  ...InitialConfig.operators,
  // examples of  overriding
  between: {
    ...InitialConfig.operators.between,
    textSeparators: [
      "from",
      "to"
    ],
  },
};

const widgets: Widgets = {
  ...InitialConfig.widgets,
  // examples of  overriding
  slider: {
    ...InitialConfig.widgets.slider,
    customProps: {
      width: "300px"
    }
  },
  rangeslider: {
    ...InitialConfig.widgets.rangeslider,
    customProps: {
      width: "300px"
    }
  },
  date: {
    ...InitialConfig.widgets.date,
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
  },
  time: {
    ...InitialConfig.widgets.time,
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
  },
  datetime: {
    ...InitialConfig.widgets.datetime,
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  treeselect: {
    ...InitialConfig.widgets.treeselect,
    customProps: {
      showSearch: true
    }
  },
};


const types: Types = {
  ...InitialConfig.types,
  // examples of  overriding
  boolean: merge(InitialConfig.types.boolean, {
    widgets: {
      boolean: {
        widgetProps: {
          hideOperator: true,
          operatorInlineLabel: "is",
        }
      },
    },
  }),
};


const localeSettings: LocaleSettings = {
  locale: {
    moment: "ru",
    antd: ru_RU,
    material: ruRU,
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  fieldPlaceholder: "Select field",
  operatorPlaceholder: "Select operator",
  deleteLabel: null,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  addSubRuleLabel: "Add sub rule",
  delGroupLabel: null,
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: {
    title: "Are you sure delete this rule?",
    okText: "Yes",
    okType: "danger",
  },
  removeGroupConfirmOptions: {
    title: "Are you sure delete this group?",
    okText: "Yes",
    okType: "danger",
  },
};

const settings: Settings = {
  ...InitialConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: "Value"
    },
    field: {
      label: "Field",
      widget: "field",
    },
    func: {
      label: "Function",
      widget: "func",
    }
  },
  // canReorder: false,
  // canRegroup: false,
  // showNot: false,
  // showLabels: true,
  maxNesting: 3,
  canLeaveEmptyGroup: true, //after deletion

  // renderField: (props) => <FieldCascader {...props} />,
  // renderOperator: (props) => <FieldDropdown {...props} />,
  // renderFunc: (props) => <FieldSelect {...props} />,
};

const funcs: Funcs = {};



const config: Config = {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields,
  funcs
};

export default config;

