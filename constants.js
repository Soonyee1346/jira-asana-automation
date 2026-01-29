const LOGS_SPREADSHEET_ID = props.getProperty('LOGS_SPREADSHEET_ID');

const JIRA_API_TOKEN = props.getProperty('JIRA_API_TOKEN');
const JIRA_EMAIL = props.getProperty('JIRA_EMAIL');
const JIRA_URL = props.getProperty('JIRA_URL');

const ASANA_API_TOKEN = props.getProperty('ASANA_API_TOKEN');
const ASANA_PROJECT_ID = props.getProperty('ASANA_PROJECT_ID');

const COMPUTER_NAME_MAP = {
  'Physical Device - Macbook (Standard)' : '1212684489261906', // Mac T1
  'Physical Device - Macbook (Performance)' : '1212684489261907', // Mac T2
  'Physical Device - Windows (Standard)' : '1212684489261904', // HP T1
  'Physical Device - Windows (Performance)' : '1212684489261905', // HP T2
  'BYOD' : '1212684489261908', // BYOD
  'Custom' : '1212684489261909', // Custom
  'Standard W365 Cloud PC' : '1212684489261910', // W365
  'Performance W365 Cloud PC' : '1212684489261910', // W365
}

const LOCATION_NAME_MAP = {
  "AU: Melbourne: (260 Burwood Rd)": "1212684488912602",
  "AU: Sydney (45 Clarence St)": "1212684488912603",
  "AU: Brisbane (243 Edward St)": "1212684488912604",
  "AU: Canberra (68 Northbourne Avenue)": "1212684488912606",
  "SG: Singapore": "1212684488912607",
  "IND: India Remote Location": "1212684488912608",
  "PH: Remote Worker": "1212684488912609",
  "Dubai": "1212684488912615",
  "AU: Victoria Remote Worker": "1212684488912610",
  "AU: New South Wales Remote Worker": "1212684488912611",
  "AU: Queensland Remote Worker": "1212684488912612",
  "AU: South Australia Remote Worker": "1212684488912613",
  "AU: Western Australia Remote Worker": "1212684488912614",
  "AU: Tasmania Remote Worker": "1212684488912616",
  "AU: Australian Captial Terrirory Remote Worker" : "1212684488912606",
  "AU: Northern Territory Remote" : ""

}

const CUSTOM_FIELD_MAP = {
  'computerField' : '1212684489261903',
  'locationField' : '1212674241162891',
  'managerField' : '1212674241283034',
  'positionField' : '1212684489261897',
  'jiraField' : '1203288574208508'
}

const USER_GID_MAP = {
  'Sunyee Zheng' : '1209720270391663',
  'Rosie Hrstic' : '1210796357731279',
  'Baht Clark' : '1207242278288461',
  'Thomas Newton' : '1205495638959866',
  'Kevin Ilao' : '1205219112816306',
  'Rickie McGee' : '1161934207444304',
  'Payal Patel' : '1212336819296848',
}