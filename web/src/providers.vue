<template>
    <div>
        <div class='uk-container small-section'>
<vk-card >
  <h1>Providers</h1>
  <ul id="v-for-object" class="demo">
  <table class="uk-table uk-table-divider">
    <caption></caption>
    <thead>
        <tr>
            <th>Ticker</th>
            <th>Insurer</th>
        </tr>
    </thead>
    <tbody>
       <tr v-for="(value, key)  in insurers" :key="value">
    <td>{{ value }}</td>
    <td>{{ key }}</td>

    </tr>
    </tbody>
</table>
</ul>
</vk-card>
   
        </div>
    </div>
</template>

<script lang="ts">
console.log("init");

import { host } from "./host";

import Vue from "vue";

export default Vue.extend({
  data: function(this: any) {
    return {
      insurers: {
        "XL Group Ltd (XL)": "XL",
        "United Fire Group, Inc. (UFCS)": "UFCS",
        "Allied World Assurance Company Holdings, AG (AWH)": "AWH",
        "Employers Holdings, Inc. (EIG)": "EIG",
        "Amerisafe, Inc. (AMSF)": "AMSF",
        "The Navigators Group, Inc. (NAVG)": "NAVG",
        "Fidelity National Financial, Inc. (FNFV)": "FNFV",
        "Fidelity National Financial, Inc. (FNF)": "FNF",
        "Selective Insurance Group, Inc. (SIGI)": "SIGI",
        "RLI Corp. (RLI)": "RLI",
        "First American Financial Corporation (FAF)": "FAF",
        "Aspen Insurance Holdings Limited (AHL)": "AHL",
        "AXIS Capital Holdings Limited (AXS)": "AXS",
        "Chubb Limited (CB)": "CB",
        "Safety Insurance Group, Inc. (SAFT)": "SAFT",
        "The Travelers Companies, Inc. (TRV)": "TRV",
        "Infinity Property and Casualty Corporation (IPCC)": "IPCC",
        "W. R. Berkley Corporation (WRB)": "WRB",
        "Arch Capital Group Ltd. (ACGL)": "ACGL",
        "Universal Insurance Holdings, Inc. (UVE)": "UVE",
        "Stewart Information Services Corporation (STC)": "STC",
        "HCI Group, Inc. (HCI)": "HCI",
        "United Insurance Holdings Corp. (UIHC)": "UIHC",
        "The Allstate Corporation (ALL)": "ALL",
        "AmTrust Financial Services, Inc. (AFSI)": "AFSI",
        "The Hanover Insurance Group, Inc. (THG)": "THG",
        "Mercury General Corporation (MCY)": "MCY",
        "Cincinnati Financial Corporation (CINF)": "CINF",
        "The Progressive Corporation (PGR)": "PGR",
        "ProAssurance Corporation (PRA)": "PRA",
        "Assured Guaranty Ltd. (AGO)": "AGO",
        "Old Republic International Corporation (ORI)": "ORI",
        "Markel Corporation (MKL)": "MKL",
        "Tryg A/S (TRYG)": "TRYG",
        "Anicom Holdings, Inc. (8715)": "8715",
        "Erie Indemnity Company (ERIE)": "ERIE",
        "Personal Group Holdings Plc (PGH)": "PGH",
        "Lancashire Holdings Limited (LRE)": "LRE",
        "Euroherc osiguranje d.d. (EUR)": "EUR",
        "Alm. Brand A/S (ALMB)": "ALMB",
        "CNA Financial Corporation (CNA)": "CNA",
        "Argo Group International Holdings, Ltd. (ARGO)": "ARGO",
        "Aksigorta Anonim Sirketi (AKGRT)": "AKGRT",
        "Baldwin & Lyons, Inc. (PTVC.A)": "PTVC.A",
        "Baldwin & Lyons, Inc. (PTVC.B)": "PTVC.B",
        "Investors Title Company (ITIC)": "ITIC",
        "MBIA Inc. (MBI)": "MBI",
        "Anadolu Anonim T\u00fcrk Sigorta Sirketi (ANSGR)": "ANSGR",
        "Admiral Group plc (ADM)": "ADM",
        "1347 Property Insurance Holdings, Inc. (PIH)": "PIH",
        "Target Insurance (Holdings) Limited (6161)": "6161",
        "Atlas Financial Holdings, Inc. (AFH)": "AFH",
        "Conifer Holdings, Inc. (CNFR)": "CNFR",
        "MS&AD Insurance Group Holdings, Inc. (8725)": "8725",
        "Sompo Holdings, Inc. (8630)": "8630",
        "Hastings Group Holdings plc (HSTG)": "HSTG",
        "Coface SA (COFA)": "COFA",
        "OneBeacon Insurance Group, Ltd. (OB)": "OB",
        "State Auto Financial Corporation (STFC)": "STFC",
        "Global Indemnity Limited (GBLI)": "GBLI",
        "Kingsway Financial Services Inc. (KFS)": "KFS",
        "Insr Insurance Group ASA (INSR)": "INSR",
        "Kingstone Companies, Inc. (KINS)": "KINS",
        "Kinsale Capital Group, Inc. (KNSL)": "KNSL",
        "Novae Group plc (NVA)": "NVA",
        "Interlife General Insurance Company S.A. (INLI)": "INLI",
        "White Mountains Insurance Group, Ltd. (WTM)": "WTM",
        "James River Group Holdings, Ltd. (JRVR)": "JRVR",
        "Hiscox Ltd (HSX)": "HSX",
        "Tokio Marine Holdings, Inc. (8766)": "8766",
        "esure Group plc (ESUR)": "ESUR",
        "RSA Insurance Group plc (RSA)": "RSA",
        "Heritage Insurance Holdings, Inc. (HRTG)": "HRTG",
        "KD Group, financna druzba, d. d. (KDHR)": "KDHR",
        "Direct Line Insurance Group plc (DLG)": "DLG",
        "Unico American Corporation (UNAM)": "UNAM",
        "Ambac Financial Group, Inc. (AMBC)": "AMBC",
        "First Acceptance Corporation (FAC)": "FAC",
        "Dream Incubator Inc. (4310)": "4310",
        "The People's Insurance Company (Group) of China Limited (1339)":
          "1339",
        "EMC Insurance Group Inc. (EMCI)": "EMCI",
        "Hallmark Financial Services, Inc. (HALL)": "HALL",
        "Euler Hermes Group SA (ELE)": "ELE",
        "Federated National Holding Company (FNHC)": "FNHC",
        "Donegal Group Inc. (DGIC.A)": "DGIC.A",
        "Donegal Group Inc. (DGIC.B)": "DGIC.B",
        "State National Companies, Inc. (SNC)": "SNC",
        "PICC Property and Casualty Company Limited (2328)": "2328",
        "Beazley plc (BEZ)": "BEZ",
        "V\u00e1tryggingaf\u00e9lag \u00cdslands hf. (VIS)": "VIS",
        "Jadransko Osiguranje d.d. (JDOS)": "JDOS",
        "FirstCaution SA (MLFIR)": "MLFIR",
        "Tiptree Inc. (TIPT)": "TIPT",
        "Hyundai Marine & Fire Insurance Co. Ltd. (A001450)": "A001450",
        "Insurance Australia Group Limited (IAG)": "IAG",
        "DB Insurance Co., Ltd. (A005830)": "A005830",
        "The First Insurance Co., Ltd. (2852)": "2852",
        "QBE Insurance Group Limited (QBE)": "QBE",
        "Generation Development Group Limited (GDG)": "GDG",
        "Lotte Non - Life Insurance Co., Ltd. (A000400)": "A000400",
        "Meritz Fire & Marine Insurance Co., Ltd. (A000060)": "A000060",
        "Shinkong Insurance Co., Ltd. (2850)": "2850",
        "Union Insurance Co., Ltd. (2816)": "2816",
        "Echelon Financial Holdings Inc. (EFH)": "EFH",
        "United Overseas Insurance Limited (U13)": "U13",
        "Hanwha General Insurance Co., Ltd. (A000370)": "A000370",
        "Intact Financial Corporation (IFC)": "IFC",
        'Public Joint-Stock Company "Insurance Company Yuzhural - Asko" (ACKO)':
          "ACKO",
        "Heungkuk Fire & Marine Insurance Co., Ltd. (A000540)": "A000540",
        "Samsung Fire & Marine Insurance Co., Ltd. (A000810)": "A000810",
        "Suncorp Group Limited (SUN)": "SUN",
        "Taiwan Fire & Marine Insurance Co., Ltd. (2832)": "2832",
        "The National Security Group, Inc. (NSEC)": "NSEC",
        "Kemper Corporation (KMPR)": "KMPR"
      },
      balance: "--"
    };
  }
});
</script>

<style lang="scss" scoped>
</style>
