// State unemployment agency contact details.
//
// Extracted verbatim from the migrated WordPress page. Sources, per that page:
// U.S. Department of Labor (dol.gov), individual state UI agency websites, and
// AARP.org. Cross-checked and updated August 6, 2026.
//
// Filing procedures, phone numbers, and waiting-week rules change periodically.

/**
 * @typedef {object} StateAgency
 * @property {string} state
 * @property {string} agency
 * @property {string} howToFile
 * @property {string} phone
 * @property {string} site
 * @property {'none'|'one-week'} waitingWeek
 */

/** @type {StateAgency[]} */
export const STATE_AGENCIES = [
  {
    "state": "Alabama",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "866-234-5382",
    "site": "labor.alabama.gov/unemployment.aspx",
    "waitingWeek": "one-week"
  },
  {
    "state": "Alaska",
    "agency": "Dept. of Labor & Workforce Dev.",
    "howToFile": "Online or phone (regional offices)",
    "phone": "Anchorage 907-269-4700 / Juneau 907-465-5552 / Fairbanks 907-451-2871",
    "site": "labor.alaska.gov/unemployment/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Arizona",
    "agency": "Dept. of Economic Security",
    "howToFile": "Online or phone",
    "phone": "602-542-5954",
    "site": "des.az.gov/services/employment/unemployment-individual/apply-ui-benefits",
    "waitingWeek": "one-week"
  },
  {
    "state": "Arkansas",
    "agency": "Dept. of Workforce Services",
    "howToFile": "Online or phone",
    "phone": "855-225-4440",
    "site": "dws.arkansas.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "California",
    "agency": "Employment Development Dept.",
    "howToFile": "Online (UI Online) or phone",
    "phone": "English 800-300-5616 / Spanish 800-326-8937",
    "site": "edd.ca.gov/unemployment/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Colorado",
    "agency": "Dept. of Labor and Employment",
    "howToFile": "Online or phone",
    "phone": "303-318-9000",
    "site": "cdle.colorado.gov/file-claim",
    "waitingWeek": "one-week"
  },
  {
    "state": "Connecticut",
    "agency": "Dept. of Labor",
    "howToFile": "Online only — no phone filing",
    "phone": "No phone claimant line",
    "site": "portal.ct.gov/dol/unemployment-benefits",
    "waitingWeek": "one-week"
  },
  {
    "state": "Delaware",
    "agency": "Div. of Unemployment Insurance",
    "howToFile": "Online or phone",
    "phone": "New Castle Co. 302-761-6576 / Kent & Sussex Co. 800-794-3032",
    "site": "ui.delawareworks.com",
    "waitingWeek": "one-week"
  },
  {
    "state": "District of Columbia",
    "agency": "Dept. of Employment Services",
    "howToFile": "Online or phone",
    "phone": "202-698-7550",
    "site": "does.dcnetworks.org/initialclaims/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Florida",
    "agency": "Dept. of Commerce — Reemployment Assistance",
    "howToFile": "Online (phone for help only)",
    "phone": "800-204-2418",
    "site": "connect.myflorida.com",
    "waitingWeek": "one-week"
  },
  {
    "state": "Georgia",
    "agency": "Dept. of Labor",
    "howToFile": "Online or regional office",
    "phone": "See regional offices: dol.georgia.gov/locations",
    "site": "dol.state.ga.us/fileaclaim/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Hawaii",
    "agency": "Dept. of Labor and Industrial Relations",
    "howToFile": "Online or regional office",
    "phone": "See regional offices: labor.hawaii.gov/ui/contact/",
    "site": "huiclaims.hawaii.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Idaho",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "208-332-8942",
    "site": "www2.labor.idaho.gov/ClaimantPortal/Login",
    "waitingWeek": "one-week"
  },
  {
    "state": "Illinois",
    "agency": "Dept. of Employment Security",
    "howToFile": "Online or phone",
    "phone": "800-244-5631",
    "site": "ides.illinois.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Indiana",
    "agency": "Dept. of Workforce Development",
    "howToFile": "Online or phone",
    "phone": "800-457-8283",
    "site": "in.gov/dwd/2362.htm",
    "waitingWeek": "one-week"
  },
  {
    "state": "Iowa",
    "agency": "Iowa Workforce Development",
    "howToFile": "Online or phone",
    "phone": "866-239-0843",
    "site": "iowaworkforcedevelopment.gov/file-claim-unemployment-insurance-benefits",
    "waitingWeek": "one-week"
  },
  {
    "state": "Kansas",
    "agency": "Dept. of Labor",
    "howToFile": "Online or regional office",
    "phone": "See regional offices: dol.ks.gov/contact-kdol",
    "site": "getkansasbenefits.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Kentucky",
    "agency": "Dept. for Employment Services",
    "howToFile": "Online or regional career center",
    "phone": "See career centers: kcc.ky.gov/Pages/Locations.aspx",
    "site": "uiclaims.des.ky.gov/ebenefit/eben.htm",
    "waitingWeek": "none"
  },
  {
    "state": "Louisiana",
    "agency": "Louisiana Workforce Commission",
    "howToFile": "Online or phone (call day assigned by SSN)",
    "phone": "866-783-5567",
    "site": "louisianaworks.net",
    "waitingWeek": "one-week"
  },
  {
    "state": "Maine",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "800-593-7660 / TTY 711",
    "site": "reemployme.maine.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Maryland",
    "agency": "Dept. of Labor",
    "howToFile": "Online or regional claim center",
    "phone": "See centers: dbm.maryland.gov",
    "site": "labor.maryland.gov/unemployment-insurance/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Massachusetts",
    "agency": "Dept. of Unemployment Assistance",
    "howToFile": "Online or phone",
    "phone": "617-626-6338",
    "site": "uionline.detma.org",
    "waitingWeek": "none"
  },
  {
    "state": "Michigan",
    "agency": "Unemployment Insurance Agency",
    "howToFile": "Online or phone",
    "phone": "866-500-0017",
    "site": "miwam.unemployment.state.mi.us",
    "waitingWeek": "one-week"
  },
  {
    "state": "Minnesota",
    "agency": "Dept. of Employment & Economic Dev.",
    "howToFile": "Online or phone",
    "phone": "Twin Cities 651-296-3644 / Greater MN 877-898-9090",
    "site": "uimn.org/applicants/index.jsp",
    "waitingWeek": "one-week"
  },
  {
    "state": "Mississippi",
    "agency": "Dept. of Employment Security",
    "howToFile": "Online or phone",
    "phone": "601-855-3133 or 888-844-3577",
    "site": "accessms.mdes.ms.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Missouri",
    "agency": "Div. of Employment Security",
    "howToFile": "Online or phone",
    "phone": "Toll-free 800-320-2519 (plus regional lines)",
    "site": "uinteract.labor.mo.gov/benefits/home.do",
    "waitingWeek": "one-week"
  },
  {
    "state": "Montana",
    "agency": "Unemployment Insurance Division",
    "howToFile": "Online or phone",
    "phone": "406-444-2545",
    "site": "montanaworks.gov/Job-Seeker-UI-Claimant",
    "waitingWeek": "none"
  },
  {
    "state": "Nebraska",
    "agency": "Dept. of Labor",
    "howToFile": "Online or regional center",
    "phone": "See centers: dol.nebraska.gov/Home/AboutUs",
    "site": "neworks.nebraska.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Nevada",
    "agency": "Dept. of Employment, Training & Rehab.",
    "howToFile": "Online or phone",
    "phone": "Northern NV 775-684-0350 / Southern NV 702-486-0350",
    "site": "ui.nv.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "New Hampshire",
    "agency": "Dept. of Employment Security",
    "howToFile": "Online or regional office",
    "phone": "See offices: nhes.nh.gov/locations",
    "site": "wfc.nhes.nh.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "New Jersey",
    "agency": "Dept. of Labor & Workforce Dev.",
    "howToFile": "Online or phone",
    "phone": "North NJ 201-601-4100 / Central NJ 732-761-2020 / South NJ 856-507-2340",
    "site": "myunemployment.nj.gov",
    "waitingWeek": "none"
  },
  {
    "state": "New Mexico",
    "agency": "Dept. of Workforce Solutions",
    "howToFile": "Online or phone",
    "phone": "877-664-6984",
    "site": "dws.state.nm.us/en-us/Unemployment",
    "waitingWeek": "one-week"
  },
  {
    "state": "New York",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "888-783-1370",
    "site": "applications.labor.ny.gov/IndividualReg/",
    "waitingWeek": "none"
  },
  {
    "state": "North Carolina",
    "agency": "Div. of Employment Security",
    "howToFile": "Online or phone",
    "phone": "888-737-0259",
    "site": "fed.des.nc.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "North Dakota",
    "agency": "Job Service North Dakota",
    "howToFile": "Online or phone",
    "phone": "701-328-4995",
    "site": "apps.nd.gov/jsnd/uiiaclaims/login.htm",
    "waitingWeek": "one-week"
  },
  {
    "state": "Ohio",
    "agency": "Dept. of Job & Family Services",
    "howToFile": "Online or phone",
    "phone": "877-644-6562 / TTY 614-387-8408",
    "site": "unemployment.cmt.ohio.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Oklahoma",
    "agency": "Employment Security Commission",
    "howToFile": "Online or phone",
    "phone": "OKC area 405-525-1500 / Outside OKC 800-555-1554",
    "site": "unemployment.state.ok.us",
    "waitingWeek": "one-week"
  },
  {
    "state": "Oregon",
    "agency": "Employment Department",
    "howToFile": "Online or phone",
    "phone": "In-state 800-237-3710 / Direct 503-947-1394",
    "site": "secure.emp.state.or.us",
    "waitingWeek": "one-week"
  },
  {
    "state": "Pennsylvania",
    "agency": "Dept. of Labor & Industry",
    "howToFile": "Online or phone",
    "phone": "888-313-7284 / ASL videophone 717-704-8474",
    "site": "paclaims.pa.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Puerto Rico",
    "agency": "Dept. of Labor and Human Resources",
    "howToFile": "Online or phone",
    "phone": "787-754-5353",
    "site": "trabajo.pr.gov/desempleo_en_linea.asp",
    "waitingWeek": "one-week"
  },
  {
    "state": "Rhode Island",
    "agency": "Dept. of Labor and Training",
    "howToFile": "Online or phone",
    "phone": "401-243-9100 / Out-of-state 866-557-0001",
    "site": "dlt.ri.gov/individuals/unemployment-insurance",
    "waitingWeek": "one-week"
  },
  {
    "state": "South Carolina",
    "agency": "Dept. of Employment and Workforce",
    "howToFile": "Online or phone",
    "phone": "In-state 866-831-1724 / Out-of-state 800-529-8339",
    "site": "scuihub.dew.sc.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "South Dakota",
    "agency": "Dept. of Labor and Regulation",
    "howToFile": "Online or phone",
    "phone": "605-626-3179",
    "site": "apps.sd.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Tennessee",
    "agency": "Dept. of Labor and Workforce Dev.",
    "howToFile": "Online or phone",
    "phone": "844-224-5818",
    "site": "jobs4tn.gov/vosnet/Default.aspx",
    "waitingWeek": "one-week"
  },
  {
    "state": "Texas",
    "agency": "Workforce Commission",
    "howToFile": "Online or phone",
    "phone": "800-558-8321",
    "site": "apps.twc.state.tx.us/UBS",
    "waitingWeek": "none"
  },
  {
    "state": "Utah",
    "agency": "Dept. of Workforce Services",
    "howToFile": "Online or regional center",
    "phone": "See centers: jobs.utah.gov/ui/jobseeker/contactus.html",
    "site": "jobs.utah.gov/ui/home/initialclaims",
    "waitingWeek": "one-week"
  },
  {
    "state": "Vermont",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "877-214-3330 or 888-807-7072",
    "site": "vermont.force.com/DOLClaim",
    "waitingWeek": "one-week"
  },
  {
    "state": "Virginia",
    "agency": "Employment Commission",
    "howToFile": "Online or phone",
    "phone": "866-832-2363",
    "site": "vec.virginia.gov/online-services",
    "waitingWeek": "one-week"
  },
  {
    "state": "Washington",
    "agency": "Employment Security Dept.",
    "howToFile": "Online or phone",
    "phone": "800-318-6022",
    "site": "secure.esd.wa.gov/home/",
    "waitingWeek": "one-week"
  },
  {
    "state": "West Virginia",
    "agency": "WorkForce West Virginia",
    "howToFile": "Online or phone",
    "phone": "800-252-5627 (JOBS)",
    "site": "uc.workforcewv.org/consumer/",
    "waitingWeek": "one-week"
  },
  {
    "state": "Wisconsin",
    "agency": "Dept. of Workforce Development",
    "howToFile": "Online or phone",
    "phone": "414-435-7069 or 844-910-3661",
    "site": "my.unemployment.wisconsin.gov",
    "waitingWeek": "one-week"
  },
  {
    "state": "Wyoming",
    "agency": "Dept. of Workforce Services",
    "howToFile": "Online or phone",
    "phone": "In-state 307-473-3789 / Out-of-state 866-729-7799",
    "site": "wyui.wyo.gov/benefits/home.do",
    "waitingWeek": "one-week"
  },
  {
    "state": "U.S. Virgin Islands",
    "agency": "Dept. of Labor",
    "howToFile": "Online or phone",
    "phone": "St. Croix 340-773-1440 / Other islands 340-776-3700",
    "site": "vidol.gov/unemployment-insurance/",
    "waitingWeek": "one-week"
  }
];

/** States that pay the first eligible week instead of holding it unpaid. */
export const WAITING_WEEK_WAIVED = STATE_AGENCIES.filter(
  (a) => a.waitingWeek === 'none'
).map((a) => a.state);
