class MachineLearningRegression {

    constructor() {
        this._statuses = [
            { value : 'Ready', text : 'ready to use' },
            { value : 'Training', text : 'still training' },
            { value : 'Model Failed', text : 'ERROR - broken' }
        ];
        this._outputvalues = {
            items : [  'huong_ban',  ],
            acceptReporters: true
        };

        this._icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4gwIFCspuPG7bgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAElUlEQVRIx62WW2xUVRSGv73PmTOdmZbS9AYtlEsGW8qlKlqjhhjEK6gxGhJBn3zQBB9QMcREjEaCjRofeBKNkHgJRX3AiNGIpAmKgSYNkIgIba20FAq9wXTazsw5c/byoS1Q2mnHwHrZOefstf6z/rXWv7cigy17fX9ubNjd46VNuZCdKaWwtBqqnpO/5sDbDw1OtsfO5Oz7xooNe8t2v3Lf/GhpLkYgYClCQRsRQaEQhOGUj28MCsWJ9su88UXToDFiZYprZ/5d8I2RqrIZVM/JB+DTX1vY3dDKQMLDGGFmxOG952p4tKYMgMFUGhHMVCzYWbLFhh2HcWxNY93jbN17grKZYTY+dhu1b/7M0eZe3lm3PKs40wJqrfjkl2YsrejoGeKZjw4RcmyOtfXT1NaHbwxfHmrj7mghhXnBmwdUQMPJi9Q9fwcdPUMcae7h4/2n2LR2MauWzqLrchm2VtT/cZZX1yyeFlBPt0GApRUzqdt3ki1fH6OyPJ+XH6mkbzDFSzuPUBstpK17kNqFhRiRW5PhpViS2mgRyysK+KGpk0tXEjxQXcrcwggtF+P8cylOUV4QlUUNs8qwIOwQG3LZtLaKo809hByLYMCiqjyfXQdb2dfYgW+ya75pAY0Rtm+4nd/PdLOroZXK8hnkhQLsPHCG8/3D3F9VzD2Liti+vgY3bW6e0jFbsaCQU+di1FQUYFuKlVUl9MZTXIwlyI84aKWQWzEWY7b12WX8eKyTbd/9CQiptCEvFODddcu5t7I42zCZAdNGo1D0D7n0xVMYEVZWlfDTWw/ijVIXsBWW0qQ8n17PEBtyQYGRzMnamWunyA0F5IUdh9FajevasVXGuuqqFAqOZWGmIFfFG9f9jVJVN/aPQgjZPkpN4iwu7+s6QtpDTTIMnmcm7XZfpNEGM5yz8DV0uCLjWIx7Tg+QPL0NY8ET8xZQEAxmcWxBXzJJfXPLsA2CzilFO8WIpEEplBW+jjxB/ASIjHyzZ4ysQEEwSHEoB4BEOo1SIz6O1mg1PnMjI4UdqaFycDv34PX+Bgih6m3oUMVoRoMkTm5G/BRWbpRgdPPEegvsPn2aVNonEgjw5Px5lEUiUwy+uDjzXkQ5BVi5UbyehmsHcew4yikBhJxFW8C4E4Mo2LhkCUaE9YuiGcFuUBoB4xIoWkW6++DVt+65egLFq8F4iPEyBvJGhTs9jYBPGAvlFKGcQtLdB1HhCsRPoMPzuVU2UUu1Q6BkNW7X97jnvyFQ8jDKDv/vwJ4xHO7qyka8DYFZT2ES7fj9jThz14Pxx099FmZEaI0NZKJUY5IXEONiEufQkSiB0jWIPwRo/EQ7gmCG29GhuZMC9CeTiMCVVAoFpHx/ihrqAF7nXiQdJ9XxFTqvmsDspxEvhnhXSJ39HKU07r87CS35cNJsPvvrFDmWxbctrVfFoiIvNwOgcQlGNzNBM3JmAxC5c9e1XvYGxinIyFgott61YgLl18ueugaoMMkLoLM8qdJxGFWNvmQyq3uMAnqTSTQoG2U3JZo/iCNZXhKUQlthjDHUN7cgIlm6KRWy7eP/AR5T4+fuc4K4AAAAAElFTkSuQmCC';

        // PRE-EMBEDDED training data (235 rows)
        this.trainingData = [
        {x_muoi:-109.44408181895648, y_muoi:140.34990755160177, huong_muoi:90, huong_ban:40},
        {x_muoi:-106.27924641333313, y_muoi:94.36504963311098, huong_muoi:78, huong_ban:5},
        {x_muoi:-126.00390423322128, y_muoi:3.26106359176403, huong_muoi:-63, huong_ban:-80},
        {x_muoi:-92.87362647099268, y_muoi:145.90560442460645, huong_muoi:-21, huong_ban:-30},
        {x_muoi:-89.13731961198215, y_muoi:61.5651071811346, huong_muoi:-40, huong_ban:-45},
        {x_muoi:168.34396715809035, y_muoi:124.76983119755657, huong_muoi:-104, huong_ban:65},
        {x_muoi:45.865330600317556, y_muoi:-9.842465453704868, huong_muoi:-117, huong_ban:130},
        {x_muoi:142.31343866425277, y_muoi:-58.08826873511826, huong_muoi:2, huong_ban:105},
        {x_muoi:28.95341646514938, y_muoi:-26.717641340001137, huong_muoi:-140, huong_ban:125},
        {x_muoi:154.24652505919013, y_muoi:-141.08566352684576, huong_muoi:132, huong_ban:135},
        {x_muoi:193.34020892450727, y_muoi:20.253269138988728, huong_muoi:128, huong_ban:80},
        {x_muoi:28.110589780944263, y_muoi:36.780059122531036, huong_muoi:-33, huong_ban:25},
        {x_muoi:-38.98805665793108, y_muoi:18.558418580715866, huong_muoi:-103, huong_ban:-55},
        {x_muoi:-150.00742171972743, y_muoi:45.985201578450116, huong_muoi:-178, huong_ban:-75},
        {x_muoi:140.35097639032645, y_muoi:-161.01837775418258, huong_muoi:34, huong_ban:140},
        {x_muoi:-207.30968919568454, y_muoi:-117.3842918017952, huong_muoi:21, huong_ban:-120},
        {x_muoi:173.1501176203107, y_muoi:77.75164367325908, huong_muoi:88, huong_ban:125},
        {x_muoi:190.04742362926547, y_muoi:125.65490946330372, huong_muoi:-134, huong_ban:150},
        {x_muoi:-67.03636291213867, y_muoi:-79.68133966272822, huong_muoi:-27, huong_ban:-130},
        {x_muoi:-48.89831230667382, y_muoi:-3.489799231641774, huong_muoi:99, huong_ban:-110},
        {x_muoi:-29.37532001360896, y_muoi:125.40737706460094, huong_muoi:-46, huong_ban:-135},
        {x_muoi:9.507261091464063, y_muoi:-160.0634407830873, huong_muoi:23.000000000000014, huong_ban:180},
        {x_muoi:87.74954540041759, y_muoi:-109.78107960379192, huong_muoi:-79, huong_ban:135},
        {x_muoi:-111.28330197473879, y_muoi:89.9785337181916, huong_muoi:-68, huong_ban:-95},
        {x_muoi:-59.3496319388245, y_muoi:-83.99279872521768, huong_muoi:80, huong_ban:-135},
        {x_muoi:163.89387475369145, y_muoi:-95.31422913794277, huong_muoi:48, huong_ban:125},
        {x_muoi:-133.3831128256722, y_muoi:-132.22796069065754, huong_muoi:-125, huong_ban:-125},
        {x_muoi:105.97034450088314, y_muoi:62.34962200182394, huong_muoi:126, huong_ban:55},
        {x_muoi:17.57325769619228, y_muoi:50.707416300635785, huong_muoi:-133, huong_ban:5},
        {x_muoi:-159.50644155789982, y_muoi:98.91688455633015, huong_muoi:133, huong_ban:-130},
        {x_muoi:70.88664757717552, y_muoi:-142.45561957817142, huong_muoi:-1, huong_ban:145},
        {x_muoi:132.2571411450152, y_muoi:-16.890945729615204, huong_muoi:29, huong_ban:90},
        {x_muoi:187.97072910605675, y_muoi:85.52271559507716, huong_muoi:-122, huong_ban:140},
        {x_muoi:-148.00296119350952, y_muoi:-149.34614194853512, huong_muoi:108, huong_ban:-140},
        {x_muoi:-13.343516494287677, y_muoi:131.93602923183678, huong_muoi:-157, huong_ban:110},
        {x_muoi:-55.18965787762195, y_muoi:-55.93265871528625, huong_muoi:168, huong_ban:-150},
        {x_muoi:-200.02713098894944, y_muoi:-85.04954226740483, huong_muoi:41, huong_ban:-120},
        {x_muoi:-199.48064569509543, y_muoi:22.866175217435337, huong_muoi:-103, huong_ban:-65},
        {x_muoi:-187.49775119847328, y_muoi:36.84598855818245, huong_muoi:142, huong_ban:-40},
        {x_muoi:103.64280741267936, y_muoi:84.83856269439298, huong_muoi:10, huong_ban:65},
        {x_muoi:-215.4638618300226, y_muoi:2.6710629579162806, huong_muoi:28.999999999999993, huong_ban:-90},
        {x_muoi:-171.84971220056764, y_muoi:-82.0432748940756, huong_muoi:111, huong_ban:-120},
        {x_muoi:-100.61317792642404, y_muoi:-106.81654808077596, huong_muoi:112, huong_ban:-135},
        {x_muoi:177.01953203251978, y_muoi:-130.29831672090893, huong_muoi:88, huong_ban:135},
        {x_muoi:17.846865887056353, y_muoi:-25.762765177777524, huong_muoi:-126, huong_ban:110},
        {x_muoi:-96.95949774411231, y_muoi:102.41348480941757, huong_muoi:-76, huong_ban:10},
        {x_muoi:-195.7121771305989, y_muoi:-85.01185095332796, huong_muoi:174, huong_ban:-105},
        {x_muoi:86.69148888363306, y_muoi:66.03697176479814, huong_muoi:88, huong_ban:40},
        {x_muoi:87.11717083686624, y_muoi:-87.38000864678085, huong_muoi:-59, huong_ban:145},
        {x_muoi:-212.54065045171126, y_muoi:102.37960265663835, huong_muoi:-126, huong_ban:-50},
        {x_muoi:103.81156298987253, y_muoi:19.991501904127745, huong_muoi:-161, huong_ban:90},
        {x_muoi:-29.823973529326352, y_muoi:56.066442572290576, huong_muoi:-14, huong_ban:-45},
        {x_muoi:12.184822624406927, y_muoi:-79.8002443035492, huong_muoi:-50, huong_ban:175},
        {x_muoi:105.72113496318164, y_muoi:-21.78663057665186, huong_muoi:-64, huong_ban:105},
        {x_muoi:60.58642786983682, y_muoi:-103.17872381088127, huong_muoi:-165, huong_ban:160},
        {x_muoi:-95.03053542282505, y_muoi:-64.23184205105717, huong_muoi:-60, huong_ban:-130},
        {x_muoi:-73.93997050982541, y_muoi:67.4212060349579, huong_muoi:-31, huong_ban:-15},
        {x_muoi:-163.72205773194145, y_muoi:42.74290506175495, huong_muoi:111.00000000000001, huong_ban:-65},
        {x_muoi:-185.22220264733076, y_muoi:-126.48944228502744, huong_muoi:98, huong_ban:-120},
        {x_muoi:44.21106015559387, y_muoi:-5.199273220064965, huong_muoi:-36, huong_ban:75},
        {x_muoi:109.49351281495782, y_muoi:101.19579078817068, huong_muoi:-172, huong_ban:40},
        {x_muoi:-17.858838445545114, y_muoi:0.47020290193210024, huong_muoi:-89, huong_ban:-60},
        {x_muoi:108.91448031117501, y_muoi:18.883679121175934, huong_muoi:156, huong_ban:85},
        {x_muoi:-68.05512027425226, y_muoi:48.8586260778115, huong_muoi:6, huong_ban:-45},
        {x_muoi:141.09835446606257, y_muoi:-48.217027391904836, huong_muoi:-82, huong_ban:105},
        {x_muoi:32.66575286142037, y_muoi:-142.67904688622716, huong_muoi:90, huong_ban:170},
        {x_muoi:177.28486704322324, y_muoi:145.34819353283876, huong_muoi:-152, huong_ban:180},
        {x_muoi:-97.28659564834255, y_muoi:69.70804305505649, huong_muoi:87, huong_ban:-45},
        {x_muoi:-1.0527970703102856, y_muoi:-23.85364820540858, huong_muoi:-85, huong_ban:-140},
        {x_muoi:66.39764087430194, y_muoi:92.94431805382867, huong_muoi:101, huong_ban:47.000850677490234},
        {x_muoi:-80.08185104710213, y_muoi:139.11274852635773, huong_muoi:27, huong_ban:-23.22021484375},
        {x_muoi:74.09781887905696, y_muoi:52.82870482710908, huong_muoi:81, huong_ban:74.68759155273438},
        {x_muoi:-204.39592286929232, y_muoi:9.212221004838149, huong_muoi:49.999999999999986, huong_ban:-86.37586212158203},
        {x_muoi:-139.96589550283375, y_muoi:-142.79154780538798, huong_muoi:-14, huong_ban:-125},
        {x_muoi:8.137090694427116, y_muoi:-145.77204959925493, huong_muoi:-11.000000000000043, huong_ban:-175},
        {x_muoi:136.49532951277672, y_muoi:43.94435892962206, huong_muoi:-95, huong_ban:85},
        {x_muoi:-165.96852660354034, y_muoi:78.62521118966254, huong_muoi:49, huong_ban:20},
        {x_muoi:198.44864798815013, y_muoi:-69.09080357574751, huong_muoi:-177, huong_ban:110},
        {x_muoi:117.70404628222374, y_muoi:-70.89353364707604, huong_muoi:90, huong_ban:120},
        {x_muoi:108.83117621689507, y_muoi:134.70986633942394, huong_muoi:121, huong_ban:75},
        {x_muoi:-154.52452249638765, y_muoi:-87.63383521493171, huong_muoi:115, huong_ban:-125},
        {x_muoi:-156.86984251431636, y_muoi:-32.73262643739901, huong_muoi:-101, huong_ban:-105},
        {x_muoi:-208.89259142564066, y_muoi:-102.04628662107264, huong_muoi:-6, huong_ban:-120},
        {x_muoi:-28.60419108243948, y_muoi:132.88222792782733, huong_muoi:-59, huong_ban:-25},
        {x_muoi:-164.13257508627407, y_muoi:-129.3415542718836, huong_muoi:90, huong_ban:-125},
        {x_muoi:211.4102124747114, y_muoi:-44.57370498608802, huong_muoi:179, huong_ban:110},
        {x_muoi:-155.54146323378072, y_muoi:104.66008501150498, huong_muoi:143, huong_ban:10},
        {x_muoi:153.73766594087496, y_muoi:74.17990400522885, huong_muoi:131, huong_ban:-5},
        {x_muoi:141.87350227385247, y_muoi:-142.5491760673474, huong_muoi:-19.000000000000014, huong_ban:135},
        {x_muoi:126.40665660923437, y_muoi:90.0304997916008, huong_muoi:-167, huong_ban:85},
        {x_muoi:-105.23964316260401, y_muoi:149.57687232436928, huong_muoi:-89, huong_ban:30},
        {x_muoi:-169.98314825416747, y_muoi:10.747456733467153, huong_muoi:49, huong_ban:-85},
        {x_muoi:220.71688433382215, y_muoi:-65.42818071271269, huong_muoi:-127.99999999999997, huong_ban:110},
        {x_muoi:-167.23951746079558, y_muoi:-134.6923203696102, huong_muoi:-14.000000000000014, huong_ban:-130},
        {x_muoi:21.303284698244823, y_muoi:-161.25723288056324, huong_muoi:-48.00000000000003, huong_ban:180},
        {x_muoi:-172.55221960806935, y_muoi:117.06602241150456, huong_muoi:78.99999999999999, huong_ban:-45},
        {x_muoi:208.19920364368758, y_muoi:-5.942033245050782, huong_muoi:-3, huong_ban:100},
        {x_muoi:195.82816260858291, y_muoi:98.06543815573951, huong_muoi:-159, huong_ban:115},
        {x_muoi:31.399678529193817, y_muoi:3.4560397839084454, huong_muoi:-37, huong_ban:55},
        {x_muoi:-57.09059786264736, y_muoi:30.483627814162908, huong_muoi:128, huong_ban:-160},
        {x_muoi:-79.8702937083173, y_muoi:47.5268017015463, huong_muoi:87, huong_ban:165},
        {x_muoi:-188.82224379928314, y_muoi:-28.94038422688792, huong_muoi:-127, huong_ban:-110},
        {x_muoi:-184.8167442812226, y_muoi:-70.16365241562242, huong_muoi:90, huong_ban:-100},
        {x_muoi:-141.21446786592452, y_muoi:1.568357663348591, huong_muoi:148, huong_ban:-95},
        {x_muoi:183.27092601954018, y_muoi:130.96424051029362, huong_muoi:-136, huong_ban:65},
        {x_muoi:-180.98353632516807, y_muoi:68.45058585059836, huong_muoi:123, huong_ban:-65},
        {x_muoi:132.59540193972438, y_muoi:160.53824619542422, huong_muoi:-167, huong_ban:45},
        {x_muoi:-130.68613286546875, y_muoi:-110.57659453055382, huong_muoi:-18, huong_ban:-125},
        {x_muoi:-15.981381228893438, y_muoi:59.21930147280559, huong_muoi:152, huong_ban:-45},
        {x_muoi:-30.90981446891309, y_muoi:98.66744028415467, huong_muoi:140, huong_ban:-3.782047748565674},
        {x_muoi:91.84641005655357, y_muoi:149.5483299989777, huong_muoi:97, huong_ban:37.971282958984375},
        {x_muoi:-201.80082360185912, y_muoi:26.769487271174075, huong_muoi:-28, huong_ban:-74.93173217773438},
        {x_muoi:106.50389133035696, y_muoi:18.86725758374611, huong_muoi:-36, huong_ban:78.8284912109375},
        {x_muoi:1.7327682641197022, y_muoi:74.9962986953877, huong_muoi:128, huong_ban:7.460115909576416},
        {x_muoi:-97.24520157421173, y_muoi:107.81859249856045, huong_muoi:146, huong_ban:-32.973609924316406},
        {x_muoi:-8.07246024357707, y_muoi:120.18622056562492, huong_muoi:53, huong_ban:4.757750511169434},
        {x_muoi:-65.23126271566215, y_muoi:63.045724855948016, huong_muoi:60, huong_ban:-36.32625961303711},
        {x_muoi:81.56896185902266, y_muoi:69.70498967936281, huong_muoi:90, huong_ban:44.63886260986328},
        {x_muoi:7.23757144808985, y_muoi:30.343498842661898, huong_muoi:165, huong_ban:-1.3612918853759766},
        {x_muoi:-220.8746029808302, y_muoi:-97.38651273850869, huong_muoi:116.99999999999997, huong_ban:-103.95879364013672},
        {x_muoi:54.205335436856856, y_muoi:8.754703468910948, huong_muoi:-98, huong_ban:106.39888000488281},
        {x_muoi:49.189205938350405, y_muoi:92.96106597376286, huong_muoi:-171, huong_ban:41.68737030029297},
        {x_muoi:58, y_muoi:91, huong_muoi:90, huong_ban:23.157400131225586},
        {x_muoi:-119.83884352156463, y_muoi:31.892481656249306, huong_muoi:-28, huong_ban:-67.8207778930664},
        {x_muoi:-170.0367325945291, y_muoi:36.55770960959942, huong_muoi:-37, huong_ban:-70.17340850830078},
        {x_muoi:8.781311359427328, y_muoi:148.60409559660397, huong_muoi:102, huong_ban:8.521310806274414},
        {x_muoi:72.00194065231936, y_muoi:49.01800257443924, huong_muoi:141, huong_ban:43.68080520629883},
        {x_muoi:89.50370776282412, y_muoi:0.3057171525094029, huong_muoi:39, huong_ban:73.2653579711914},
        {x_muoi:-119.8435230505426, y_muoi:11.629166732219467, huong_muoi:86, huong_ban:-72.65796661376953},
        {x_muoi:84.86209532986729, y_muoi:-33.79797720896027, huong_muoi:-54, huong_ban:98.66227722167969},
        {x_muoi:214.11302478900654, y_muoi:-66.58880429077911, huong_muoi:-120.99999999999997, huong_ban:119.43889617919922},
        {x_muoi:162.5890109655626, y_muoi:-75.88463825390029, huong_muoi:-173, huong_ban:120.79464721679688},
        {x_muoi:-134.57142285910163, y_muoi:151.70462273128675, huong_muoi:-126, huong_ban:-47.120018005371094},
        {x_muoi:-202.33850750830737, y_muoi:-26.726217787069515, huong_muoi:90, huong_ban:-99.76272583007812},
        {x_muoi:-112.13183506493384, y_muoi:51.33547088645147, huong_muoi:119, huong_ban:-77.76521301269531},
        {x_muoi:38.80697792021706, y_muoi:145.73523888687706, huong_muoi:101.35201485493032, huong_ban:20.6928653717041},
        {x_muoi:-7.237916438979521, y_muoi:98.84420633964518, huong_muoi:67, huong_ban:5.510072708129883},
        {x_muoi:-178.09344677721208, y_muoi:53.22647274713509, huong_muoi:-24, huong_ban:-76.5171127319336},
        {x_muoi:47.08522052466982, y_muoi:32.825955192449015, huong_muoi:-158, huong_ban:73.19444274902344},
        {x_muoi:24.444977356668577, y_muoi:135.4284057062798, huong_muoi:-172, huong_ban:5.323612213134766},
        {x_muoi:150.53976277756465, y_muoi:43.03628704705946, huong_muoi:162, huong_ban:79.93475341796875},
        {x_muoi:-77.50425403607886, y_muoi:41.42611944406878, huong_muoi:16, huong_ban:-45.16902160644531},
        {x_muoi:201.37772736605325, y_muoi:12.590257341077912, huong_muoi:38, huong_ban:98.74068450927734},
        {x_muoi:189.35213767332115, y_muoi:-118.81676309868075, huong_muoi:-175, huong_ban:120.35489654541016},
        {x_muoi:168.79503885370482, y_muoi:52.59223905388647, huong_muoi:179, huong_ban:80.06756591796875},
        {x_muoi:121.53714133760528, y_muoi:0.022908998696863137, huong_muoi:-161, huong_ban:99.79093170166016},
        {x_muoi:188.33201945860247, y_muoi:75.3140468889635, huong_muoi:141, huong_ban:76.28083801269531},
        {x_muoi:-5.255963556244821, y_muoi:17.13951308647905, huong_muoi:157, huong_ban:-10.768518447875977},
        {x_muoi:-188.417712594556, y_muoi:88.02733899852336, huong_muoi:-40, huong_ban:-64.0542221069336},
        {x_muoi:0.7989898732233325, y_muoi:112.20101012677668, huong_muoi:135, huong_ban:-2.971421241760254},
        {x_muoi:-131.6222707953965, y_muoi:135.72997340333845, huong_muoi:-74, huong_ban:-53.59076690673828},
        {x_muoi:-155, y_muoi:50, huong_muoi:78.69006752597979, huong_ban:-67.58932495117188},
        {x_muoi:-187.50408236509335, y_muoi:-40.03877279392806, huong_muoi:131, huong_ban:-108.08126831054688},
        {x_muoi:72.72312736416676, y_muoi:38.37814543470396, huong_muoi:26, huong_ban:58.04151153564453},
        {x_muoi:221.21445427547798, y_muoi:-80.32696121380175, huong_muoi:-130, huong_ban:121.01581573486328},
        {x_muoi:34.514976137667695, y_muoi:57.73136584542294, huong_muoi:129, huong_ban:33.47511291503906},
        {x_muoi:-92.39513823528554, y_muoi:76.58419909655018, huong_muoi:85, huong_ban:-40.30548858642578},
        {x_muoi:-178, y_muoi:153, huong_muoi:78.69006752597979, huong_ban:-44.82606506347656},
        {x_muoi:-211.49083429400955, y_muoi:-53.27579238927109, huong_muoi:7, huong_ban:-93.36084747314453},
        {x_muoi:189.1999143606912, y_muoi:-129.13417528068027, huong_muoi:-155, huong_ban:125.38262939453125},
        {x_muoi:47.39588029700246, y_muoi:1.9626379807133043, huong_muoi:-100, huong_ban:56.02581024169922},
        {x_muoi:-1.9887296383305806, y_muoi:29.94500826891429, huong_muoi:105, huong_ban:7.969959259033203},
        {x_muoi:10.192232721345796, y_muoi:27.190355812448388, huong_muoi:-11, huong_ban:27.974565505981445},
        {x_muoi:144.70154502789157, y_muoi:81.62989276850578, huong_muoi:-13, huong_ban:52.672264099121094},
        {x_muoi:61.19428326050298, y_muoi:46.631072760553, huong_muoi:-142, huong_ban:60.54331970214844},
        {x_muoi:-79.44523300354878, y_muoi:-15.307163661871384, huong_muoi:64, huong_ban:-83.9821548461914},
        {x_muoi:-143.44837621281698, y_muoi:81.82598438331205, huong_muoi:24, huong_ban:-52.390342712402344},
        {x_muoi:-81.19944458948002, y_muoi:59.39537861901846, huong_muoi:90, huong_ban:-47.09130096435547},
        {x_muoi:-169.46805658901013, y_muoi:60.407397528487756, huong_muoi:172, huong_ban:-75.2848129272461},
        {x_muoi:-107.07048592696654, y_muoi:54.361076681872305, huong_muoi:69, huong_ban:-56.654930114746094},
        {x_muoi:-187.26993222628252, y_muoi:-47.831556930234456, huong_muoi:47.999999999999986, huong_ban:-90.20843505859375},
        {x_muoi:115.07041862272372, y_muoi:-142.0921310623093, huong_muoi:49, huong_ban:135},
        {x_muoi:-133.9652393023659, y_muoi:137.07321360960125, huong_muoi:167, huong_ban:115},
        {x_muoi:-90.34414782094055, y_muoi:132.28800334901877, huong_muoi:-63, huong_ban:120},
        {x_muoi:145.38346816001297, y_muoi:118.23138973402234, huong_muoi:-151, huong_ban:135},
        {x_muoi:50.30649824963486, y_muoi:149.31621534147075, huong_muoi:-34, huong_ban:10},
        {x_muoi:135.50477796402407, y_muoi:-71.96679787003634, huong_muoi:-81, huong_ban:110},
        {x_muoi:88.41870842907873, y_muoi:-53.95488033132744, huong_muoi:-166, huong_ban:115},
        {x_muoi:-138.72198753760284, y_muoi:-31.23488935733742, huong_muoi:-149, huong_ban:-110},
        {x_muoi:-1.3267267736924535, y_muoi:-1.2744956751913916, huong_muoi:-46, huong_ban:-35},
        {x_muoi:48.412881318121734, y_muoi:-19.197690961096505, huong_muoi:-73, huong_ban:135},
        {x_muoi:-2.884208095944779, y_muoi:158.80065292897663, huong_muoi:-23, huong_ban:-175},
        {x_muoi:47.52605321843409, y_muoi:107.5149844991292, huong_muoi:179, huong_ban:35},
        {x_muoi:-24.183803542339795, y_muoi:-85.19478292616728, huong_muoi:159, huong_ban:-170},
        {x_muoi:-100.03807843429632, y_muoi:112.20663147440521, huong_muoi:-99, huong_ban:-25},
        {x_muoi:169.52362105061633, y_muoi:8.88904096542805, huong_muoi:-52, huong_ban:105},
        {x_muoi:115.60331357972615, y_muoi:-57.416821077836794, huong_muoi:-129, huong_ban:125},
        {x_muoi:94.16509611971163, y_muoi:113.5931863898711, huong_muoi:-129, huong_ban:120},
        {x_muoi:162.53639697000082, y_muoi:-27.22464797500748, huong_muoi:90, huong_ban:155},
        {x_muoi:0.3469477045203826, y_muoi:68.623080600513, huong_muoi:126, huong_ban:20},
        {x_muoi:72.3240920489377, y_muoi:30.186217004435168, huong_muoi:-86, huong_ban:60},
        {x_muoi:117.31964651900196, y_muoi:-71.67913596800962, huong_muoi:129, huong_ban:130},
        {x_muoi:-155.6164538425589, y_muoi:28.21815571407958, huong_muoi:-71, huong_ban:-90},
        {x_muoi:199.51691020897962, y_muoi:76.0841523049387, huong_muoi:-166, huong_ban:60},
        {x_muoi:-34.77286975968265, y_muoi:58.560428021085535, huong_muoi:165, huong_ban:85},
        {x_muoi:-114.7908137246778, y_muoi:144.21791091521152, huong_muoi:-133, huong_ban:90},
        {x_muoi:-137.01406137984998, y_muoi:69.49751194481416, huong_muoi:-169, huong_ban:20},
        {x_muoi:194.99596269386038, y_muoi:-5.937199743260145, huong_muoi:27, huong_ban:100},
        {x_muoi:153.97146461246922, y_muoi:-142.7576527993785, huong_muoi:112, huong_ban:140},
        {x_muoi:112.01976316703492, y_muoi:34.740017154083525, huong_muoi:-130, huong_ban:85},
        {x_muoi:1.6798814178829744, y_muoi:67.67906855044555, huong_muoi:65, huong_ban:15},
        {x_muoi:147.6018057575038, y_muoi:69.85811197248992, huong_muoi:27, huong_ban:56.83275604248047},
        {x_muoi:2.000702290844088, y_muoi:136.29504311041956, huong_muoi:92, huong_ban:7.170950889587402},
        {x_muoi:108.08338640884621, y_muoi:49.75850246519901, huong_muoi:105, huong_ban:58.226104736328125},
        {x_muoi:98.14396313391896, y_muoi:-106.86581804521359, huong_muoi:70, huong_ban:135},
        {x_muoi:-91.2099293183755, y_muoi:-40.15348883386079, huong_muoi:135, huong_ban:-125},
        {x_muoi:139.71923307450973, y_muoi:160.21708637745814, huong_muoi:-30, huong_ban:105},
        {x_muoi:-146.39623198817503, y_muoi:-90.4827799391514, huong_muoi:-9, huong_ban:-120},
        {x_muoi:120.49300004757524, y_muoi:-89.65546430075845, huong_muoi:-88, huong_ban:135},
        {x_muoi:-85.60159441943952, y_muoi:58.81116117992249, huong_muoi:-168, huong_ban:-63.66297912597656},
        {x_muoi:-212.7238230606262, y_muoi:-16.89533593365636, huong_muoi:-14, huong_ban:-81.59046173095703},
        {x_muoi:166.14225157673786, y_muoi:-145.59682399684544, huong_muoi:-150, huong_ban:142.74807739257812},
        {x_muoi:-97.95642848648794, y_muoi:92.55775180996878, huong_muoi:70, huong_ban:-48.614593505859375},
        {x_muoi:139.12330988379207, y_muoi:-101.35361016664258, huong_muoi:-80, huong_ban:124.03511810302734},
        {x_muoi:-214.13235764753242, y_muoi:-19.269982262877726, huong_muoi:-62, huong_ban:-98.95991516113281},
        {x_muoi:11.774393898301206, y_muoi:13.05221442684224, huong_muoi:-96, huong_ban:59.958984375},
        {x_muoi:202.60679244789256, y_muoi:-123.23796420332232, huong_muoi:160, huong_ban:118.87984466552734},
        {x_muoi:-195.04890082088508, y_muoi:-52.35530092102673, huong_muoi:-102, huong_ban:-94.84822845458984},
        {x_muoi:-83.82214905122616, y_muoi:152.22572116838919, huong_muoi:30, huong_ban:-23.650596618652344},
        {x_muoi:139.38178701370356, y_muoi:48.397393658945084, huong_muoi:125, huong_ban:77.84649658203125},
        {x_muoi:44.147631570376774, y_muoi:57.93068274845667, huong_muoi:109, huong_ban:25.260196685791016},
        {x_muoi:189.05052453917094, y_muoi:-146.86008906285707, huong_muoi:130, huong_ban:128.88941955566406},
        {x_muoi:-187.745968884761, y_muoi:39.4134267472985, huong_muoi:151, huong_ban:-84.49029541015625},
        {x_muoi:-113, y_muoi:17, huong_muoi:151, huong_ban:-88.92201232910156},
        {x_muoi:-35, y_muoi:9, huong_muoi:151, huong_ban:-56.3166618347168},
        {x_muoi:198.96947748567507, y_muoi:-56.00535883036023, huong_muoi:153, huong_ban:100.61812591552734},
        {x_muoi:-154.36534855648785, y_muoi:-24.690460451846377, huong_muoi:0, huong_ban:-91.78629302978516},
        {x_muoi:-152.36068957552146, y_muoi:147.86415169646344, huong_muoi:12, huong_ban:-81.38536071777344},
        {x_muoi:46.8168006966482, y_muoi:17.70865371126466, huong_muoi:-144, huong_ban:65.70851135253906},
        {x_muoi:102.68370567742045, y_muoi:-44.94860844195105, huong_muoi:-121, huong_ban:123.8002700805664},
        {x_muoi:-123.38228836270586, y_muoi:60.894874563865216, huong_muoi:19, huong_ban:-54.86176300048828},
        {x_muoi:-218.36235813599276, y_muoi:16.064783276754586, huong_muoi:-138, huong_ban:-85.86961364746094},
        {x_muoi:124.14082545786448, y_muoi:25.84466346231759, huong_muoi:16, huong_ban:70.17557525634766},
        {x_muoi:-204.7509691900557, y_muoi:-41.98723373045236, huong_muoi:-16, huong_ban:-103.03842163085938},
        {x_muoi:-53.21961873718021, y_muoi:119.15856775658756, huong_muoi:116, huong_ban:-31.513309478759766}
        ];

        // Additional data added at runtime via addTraining block
        this.additionalData = [];

        // Model state - ready immediately since data is embedded
        this.training = false;
        this.modelReady = true;
        this.modelError = false;

        // KNN parameter
        this.K = 5;

        console.log('[ML4K-pretrained] Extension loaded with ' + this.trainingData.length + ' pre-embedded training samples. Model ready.');
    }


    getInfo() {
        return {
            id: 'mlforkidsregression26',
            name: 'con mu\u1ed7i',

            color1: '#4B4A60',
            color2: '#707070',
            color3: '#4c97ff',

            menuIconURI: this._icon,
            blockIconURI: this._icon,

            blocks: [
                {
                    opcode: 'predict',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'predict [ML4KREGRESSIONOUTPUT] from  x_muoi[INFIELD0]  y_muoi[INFIELD1]  huong_muoi[INFIELD2] ',
                    arguments: {
                        INFIELD0: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        INFIELD1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        INFIELD2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        ML4KREGRESSIONOUTPUT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this._outputvalues.items[0],
                            menu: 'outputvalues'
                        }
                    }
                },
                {
                    opcode: 'addTraining',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'add training data  x_muoi[INFIELD0]  y_muoi[INFIELD1]  huong_muoi[INFIELD2]  is  huong_ban[OUTFIELD0] ',
                    arguments: {
                        INFIELD0: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        INFIELD1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        INFIELD2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        OUTFIELD0: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        lastfield: null
                    }
                },
                {
                    opcode: 'trainNewModel',
                    blockType: Scratch.BlockType.COMMAND,
                    text: {
                        default: 'train new machine learning model',
                        id: 'mlforkids.text.trainNewModel'
                    }
                },
                {
                    opcode: 'checkModelStatus',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: {
                        default: 'Is the machine learning model [STATUS] ?',
                        id: 'mlforkids.text.checkModelStatus'
                    },
                    arguments: {
                        STATUS: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: this._statuses[0].value,
                            menu: 'statuses'
                        }
                    }
                }
            ],

            menus: {
                outputvalues: this._outputvalues,
                statuses: this._statuses
            }
        };
    }


    checkModelStatus({ STATUS }) {
        switch(STATUS) {
            case 'Ready':
                return this.modelReady;
            case 'Training':
                return this.training;
            default:
                return this.modelError;
        }
    }

    trainNewModel() {
        // With pre-embedded data, training is instant
        // But we still support the workflow for additional data
        this.training = true;
        this.modelReady = false;

        // Simulate brief training delay for UX consistency
        var that = this;
        setTimeout(function() {
            that.modelReady = true;
            that.training = false;
            console.log('[ML4K-pretrained] Model trained with ' + 
                (that.trainingData.length + that.additionalData.length) + ' samples.');
        }, 500);
    }


    predict(args) {
        var x_muoi = parseFloat(args['INFIELD0']);
        var y_muoi = parseFloat(args['INFIELD1']);
        var huong_muoi = parseFloat(args['INFIELD2']);

        if (isNaN(x_muoi) || isNaN(y_muoi) || isNaN(huong_muoi)) {
            return 0;
        }

        // Combine embedded + additional training data
        var allData = this.trainingData.concat(this.additionalData);
        if (allData.length === 0) {
            return 0;
        }

        // KNN regression: find k nearest neighbors, average their outputs
        var distances = allData.map(function(row) {
            var dx = row.x_muoi - x_muoi;
            var dy = row.y_muoi - y_muoi;
            var dh = row.huong_muoi - huong_muoi;
            return {
                dist: Math.sqrt(dx*dx + dy*dy + dh*dh),
                output: row.huong_ban
            };
        });

        distances.sort(function(a, b) { return a.dist - b.dist; });

        var k = Math.min(this.K, distances.length);
        var sum = 0;
        for (var i = 0; i < k; i++) {
            sum += distances[i].output;
        }

        var result = Math.round(sum / k);

        // Return as object matching original API (accessed by output field name)
        // But since Scratch reporter returns a single value, just return the number
        return result;
    }


    addTraining(args) {
        try {
            var values = getFieldValues(args, true);
            this.additionalData.push(values);
        }
        catch (err) {
            console.log('data not suitable for training', err);
        }
    }
}

function getFieldValues(args, includeOutput) {
    var values = {};
    values['x_muoi'] = parseFloat(args['INFIELD' + 0]);
    if (isNaN(values['x_muoi'])) {
        throw new Error('invalid value for x_muoi');
    }
    values['y_muoi'] = parseFloat(args['INFIELD' + 1]);
    if (isNaN(values['y_muoi'])) {
        throw new Error('invalid value for y_muoi');
    }
    values['huong_muoi'] = parseFloat(args['INFIELD' + 2]);
    if (isNaN(values['huong_muoi'])) {
        throw new Error('invalid value for huong_muoi');
    }
    if (includeOutput) {
        values['huong_ban'] = parseFloat(args['OUTFIELD' + 0]);
        if (isNaN(values['huong_ban'])) {
            throw new Error('invalid value for huong_ban');
        }
    }
    return values;
}



Scratch.extensions.register(new MachineLearningRegression());
