//the list of the banks and their code names (value)
export const BanksList = [
	{ label: 'Access Bank', value: 'access-bank' },
	{ label: 'AFB Bank', value: 'afb-bank' },
    { label: 'Azer-Turk Bank', value: 'azer-turk-bank' },
    { label: 'Bank BTB', value: 'bank-btb' },
    { label: 'Bank VTB', value: 'bank-vtb' },
	{ label: 'Bank Eurasia', value: 'bank-eurasia' },
    { label: 'Bank of Baku', value: 'bank-of-baku' },
    { label: 'Bank Respublica', value: 'bank-respublica' },
    { label: 'Pasha Bank', value: 'pasha-bank' },
    { label: 'Premium Bank', value: 'premium-bank' },
    { label: 'MuganBank', value: 'mugan-bank' },
];

//requirements
const PIN_CODE = "Pin Code (from Identity Card): Last 7 characters excluding the last one"
const DoB = "Date of Birth: DD.MM.YYYY";
const CLIENT_CODE = "Client Code";
const CLIENT_ID = "Client ID: PAŞA Bankda hesab açmış müştəriyə bank tərəfindən təqdim edilmiş indentifikasiya nömrəsi nəzərdə tutulur";
const ID_CARD_NUMBER = "ID Card Number: e.g. AZEXXXXXXXX"


//the requirements of all banks by their code names
export const BanksInputs = {
    "premium-bank": [PIN_CODE, DoB],
    "pasha-bank": [CLIENT_ID, ID_CARD_NUMBER],
};