import {getIngredientReaderPack} from './ingredient-reader-packs';
import type {Language} from '../i18n/config';
type Text = {en:string;zh:string};
type Row = {form:Text;composition:Text;use:Text};
export type ExtractSale = {id:string;name:Text;identity:Text;offer:Text;forms:Row[];assay:Text;quality:Text;application:Text;faq:Text;answer:Text;benefits:[Text,Text,Text,Text];reading:Record<'processes'|'equipment'|'applications'|'standards'|'insights',Text>;sources:number[]};
export const extractSales:ExtractSale[]=[
  {
    "id": "green-tea",
    "name": {
      "en": "Green Tea Extract",
      "zh": "绿茶提取物"
    },
    "identity": {
      "en": "Camellia sinensis · leaf extract",
      "zh": "Camellia sinensis · 叶提取物"
    },
    "offer": {
      "en": "ZL Botanicals supplies green tea extract for ready-to-drink tea, instant tea powders and catechin-based dry blends. Our quotation range distinguishes flavour-led soluble extracts from catechin-oriented powders, with EGCG, caffeine and carrier composition stated for the selected grade.",
      "zh": "振隆供应适用于即饮茶、速溶茶粉及儿茶素型干混粉的绿茶提取物。选型报价区分风味型可溶提取物与儿茶素型粉末，并按所选规格列明 EGCG、咖啡因及载体组成。"
    },
    "forms": [
      {
        "form": {
          "en": "Soluble tea extract",
          "zh": "速溶茶提取物"
        },
        "composition": {
          "en": "Broad soluble tea solids; carrier declared",
          "zh": "可溶性茶固形物；列明载体"
        },
        "use": {
          "en": "Instant tea and RTD development",
          "zh": "速溶茶及即饮茶开发"
        }
      },
      {
        "form": {
          "en": "Catechin-oriented dry extract",
          "zh": "儿茶素型干粉"
        },
        "composition": {
          "en": "EGCG and other catechins specified separately",
          "zh": "EGCG 与其他儿茶素分别约定"
        },
        "use": {
          "en": "Composition-led powder blends",
          "zh": "以成分为重点的粉剂"
        }
      },
      {
        "form": {
          "en": "Low-caffeine project",
          "zh": "低咖啡因项目"
        },
        "composition": {
          "en": "Residual caffeine target and method agreed in quote",
          "zh": "报价中约定残留咖啡因目标及方法"
        },
        "use": {
          "en": "Caffeine-controlled formulation",
          "zh": "控制咖啡因的配方"
        }
      }
    ],
    "assay": {
      "en": "EGCG, individual catechins and caffeine by agreed HPLC methods; total polyphenols reported separately. The specification states whether values are on a dry or as-supplied basis.",
      "zh": "EGCG、单体儿茶素及咖啡因采用约定的 HPLC 方法；茶多酚另列。规格注明含量按干基还是供应原样计算。"
    },
    "quality": {
      "en": "Leaf traceability, pesticide risk assessment and residual-solvent declaration accompany grade qualification. Low caffeine needs a measurable limit, not just a name.",
      "zh": "规格确认关注叶原料追溯、农残风险与溶剂声明；低咖啡因须落实到可测限值。"
    },
    "application": {
      "en": "Tea flavour, astringency, haze and sediment decide beverage fit. Evaluate the selected sample in your water, acid and heat process; concentrated EGCG exposure requires a separate safety review.",
      "zh": "茶感、涩感、浑浊和沉淀决定饮料适配性。样品需放入实际水质、酸度及热加工条件评价；浓缩 EGCG 摄入量另行安全评估。"
    },
    "faq": {
      "en": "Does a higher EGCG assay make a clearer drink?",
      "zh": "EGCG 越高，饮料就越清澈吗？"
    },
    "answer": {
      "en": "No. We distinguish catechin enrichment from beverage clarity in the quotation, with flavour and caffeine requirements recorded for the selected sample.",
      "zh": "不是。报价分别列明儿茶素组成与饮料澄清要求，并为所选样品记录茶感及咖啡因指标。"
    },
    "sources": [
      18,
      25
    ],
    "benefits": [
      {
        "en": "Competitive bulk pricing for flavour-led tea extracts and catechin-oriented powders, based on the composition and beverage performance your product needs.",
        "zh": "风味型茶提取物与儿茶素型粉末按成分及应用要求报价，以有竞争力的批量价格匹配产品需求。"
      },
      {
        "en": "Repeat-order specifications keep EGCG, caffeine and tea flavour requirements explicit, giving your team a consistent basis for incoming-material acceptance.",
        "zh": "复购规格明确 EGCG、咖啡因及茶感要求，为来料验收提供一致依据。"
      },
      {
        "en": "Tea-material qualification and certification-document support helps brands and manufacturers complete supplier onboarding.",
        "zh": "围绕茶原料提供资质与认证资料支持，帮助品牌商及制造企业完成供应商准入。"
      },
      {
        "en": "Sample and bulk-order coordination keeps the selected tea grade, packaging and documents together in the written delivery plan.",
        "zh": "样品与批量订单协同安排，将所选茶原料规格、包装和文件纳入书面交付计划。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Tea-solids recovery and catechin enrichment produce different flavour and composition profiles.",
        "zh": "茶固形物回收与儿茶素富集会形成不同的风味及组成。"
      },
      "equipment": {
        "en": "Filtration and concentration affect tea clarity; drying choices affect powder reconstitution.",
        "zh": "过滤与浓缩影响茶液澄清度，干燥方式影响粉体复溶。"
      },
      "applications": {
        "en": "Compare citrus tea, oat-latte and instant-tea combinations in the green-tea formulation notes.",
        "zh": "绿茶配方笔记比较柑橘茶、燕麦拿铁及速溶茶组合。"
      },
      "standards": {
        "en": "The tea methods discussion separates catechin measurements from broader polyphenol assays.",
        "zh": "茶原料方法讨论区分儿茶素测定与范围更广的多酚检测。"
      },
      "insights": {
        "en": "Tea-waste extraction studies and concentrated-EGCG safety assessments answer different questions.",
        "zh": "茶废料提取研究与浓缩 EGCG 安全评估回答不同问题。"
      }
    }
  },
  {
    "id": "centella-asiatica",
    "name": {
      "en": "Centella Asiatica Extract",
      "zh": "积雪草提取物"
    },
    "identity": {
      "en": "Centella asiatica · leaf / aerial-part extract",
      "zh": "Centella asiatica · 叶／地上部分提取物"
    },
    "offer": {
      "en": "ZL Botanicals supplies Centella asiatica extract for serums, creams and rinse-off masks. Our quotation range covers broad botanical extracts, triterpene-oriented fractions and prepared-liquid projects, with marker composition, colour and carrier matched to the cosmetic format.",
      "zh": "振隆供应面向精华、面霜及水洗面膜的积雪草提取物。选型报价涵盖常规植物提取物、三萜组分及液体原料项目，按化妆品形态匹配标志物组成、色泽和载体。"
    },
    "forms": [
      {
        "form": {
          "en": "Broad botanical extract",
          "zh": "常规植物提取物"
        },
        "composition": {
          "en": "Leaf or aerial part; solvent and carrier declared",
          "zh": "明确叶或地上部分、溶剂及载体"
        },
        "use": {
          "en": "Botanical cosmetic blends",
          "zh": "植物护肤配方"
        }
      },
      {
        "form": {
          "en": "Triterpene-oriented fraction",
          "zh": "三萜组分"
        },
        "composition": {
          "en": "Asiaticoside, madecassoside and corresponding acids distinguished",
          "zh": "区分积雪草苷、羟基积雪草苷及对应酸"
        },
        "use": {
          "en": "Composition-led serum and cream projects",
          "zh": "成分明确的精华与面霜项目"
        }
      },
      {
        "form": {
          "en": "Prepared liquid project",
          "zh": "液体原料项目"
        },
        "composition": {
          "en": "Water/glycol vehicle and preservative composition specified",
          "zh": "明确水／多元醇体系及防腐组成"
        },
        "use": {
          "en": "Liquid-phase incorporation",
          "zh": "液相添加"
        }
      }
    ],
    "assay": {
      "en": "Individual triterpenes and their sum need separate definitions. For prepared liquids, state native-extract solids and each marker concentration in the supplied liquid; do not report a dry-extract assay as the liquid-product assay.",
      "zh": "单体三萜与总量分别定义。液体原料分别列明供应液中的原生提取物固形物及各标志物浓度，不将干提取物含量直接当作液体商品含量。"
    },
    "quality": {
      "en": "Botanical identity, solvent/carrier composition, microbiology and preservative declarations support cosmetic qualification. A total-triterpene value does not establish equivalence to a branded clinical extract.",
      "zh": "植物身份、溶剂载体、微生物及防腐声明用于化妆品原料评估。总三萜值不代表与某品牌临床提取物等同。"
    },
    "application": {
      "en": "Serums need manageable colour and odour; emulsions need a compatible addition phase. Finished-product tolerance and stability remain formula-specific. Cosmetic positioning does not establish oral suitability.",
      "zh": "精华需兼顾色泽与气味，乳液需匹配添加相。成品耐受性和稳定性按配方评价，化妆品用途不代表适合口服。"
    },
    "faq": {
      "en": "Can total triterpenes replace an individual-marker specification?",
      "zh": "总三萜能替代单体指标吗？"
    },
    "answer": {
      "en": "No. Glycosides and aglycones can behave differently in a formula. Include the required marker balance and supplied vehicle in your enquiry.",
      "zh": "不能。苷与苷元在配方中的表现可能不同，询价应包含所需单体比例及供应载体。"
    },
    "sources": [
      4,
      19
    ],
    "benefits": [
      {
        "en": "Competitive pricing across the Centella quotation range lets cosmetic teams budget for the marker profile and appearance their formula needs.",
        "zh": "积雪草选型范围提供有竞争力的报价，让化妆品团队按配方所需的标志物组成与外观安排原料预算。"
      },
      {
        "en": "Defined triterpene, colour and carrier requirements give repeat orders a clear acceptance basis for the selected cosmetic ingredient.",
        "zh": "明确三萜、色泽和载体要求，为所选化妆品原料的持续采购建立清晰验收依据。"
      },
      {
        "en": "Material-specific qualification and certification-document support helps cosmetic brands and manufacturers review the selected Centella ingredient.",
        "zh": "按原料提供资质与认证资料支持，帮助化妆品品牌及制造企业审核所选积雪草原料。"
      },
      {
        "en": "Coordinated sample and order terms keep the selected powder or liquid form, packaging and documentation in the delivery plan.",
        "zh": "协同确认样品与订单条件，将所选粉体或液体形态、包装和文件纳入交付计划。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Centella fractionation changes the balance of triterpene glycosides and their corresponding acids.",
        "zh": "积雪草分级会改变三萜苷与对应酸的组成比例。"
      },
      "equipment": {
        "en": "Solvent recovery and liquid preparation serve different Centella powder and vehicle requirements.",
        "zh": "溶剂回收与液体配制分别对应积雪草粉末及载体体系要求。"
      },
      "applications": {
        "en": "The Centella notes compare water/glycol serums, lipid creams and rinse-off gel combinations.",
        "zh": "积雪草笔记比较水／多元醇精华、脂质面霜及水洗凝胶组合。"
      },
      "standards": {
        "en": "Marker-by-marker analysis distinguishes a characterized fraction from a broad Centella extract.",
        "zh": "逐一分析标志物，可区分已表征的组分与常规积雪草提取物。"
      },
      "insights": {
        "en": "Medicinal Centella preparations and cosmetic ingredient studies have different evidence scopes.",
        "zh": "药用积雪草制备物与化妆品原料研究的证据适用范围不同。"
      }
    }
  },
  {
    "id": "monk-fruit",
    "name": {
      "en": "Monk Fruit Extract",
      "zh": "罗汉果提取物"
    },
    "identity": {
      "en": "Siraitia grosvenorii · fruit extract",
      "zh": "Siraitia grosvenorii · 果实提取物"
    },
    "offer": {
      "en": "ZL Botanicals supplies monk fruit extract for reduced-sugar drinks, dairy desserts and dry mixes. Our quotation range separates fruit-flavour extracts from Mogroside V-oriented sweetener ingredients and blend projects, with residual sugars and carriers stated separately.",
      "zh": "振隆供应用于减糖饮料、乳品甜品及干混粉的罗汉果提取物。选型报价区分果味型提取物、罗汉果甜苷 V 型甜味原料及复配项目，并分别列明残留糖与载体。"
    },
    "forms": [
      {
        "form": {
          "en": "Fruit-matrix extract",
          "zh": "果实基质提取物"
        },
        "composition": {
          "en": "Broader fruit solids, colour and sugars",
          "zh": "保留较广的果实固形物、色泽及糖"
        },
        "use": {
          "en": "Fruit/herbal flavour development",
          "zh": "果味及草本风味开发"
        }
      },
      {
        "form": {
          "en": "Mogroside-V-oriented extract",
          "zh": "甜苷 V 型提取物"
        },
        "composition": {
          "en": "Agreed V assay and broader mogroside profile",
          "zh": "约定甜苷 V 含量及整体甜苷组成"
        },
        "use": {
          "en": "Concentrated sweetness",
          "zh": "浓缩甜味"
        }
      },
      {
        "form": {
          "en": "Sweetener blend project",
          "zh": "复配甜味剂项目"
        },
        "composition": {
          "en": "Extract plus declared bulking ingredients",
          "zh": "提取物配合明确的填充配料"
        },
        "use": {
          "en": "Tabletop or dry-mix formats",
          "zh": "餐桌用甜味剂或干混粉"
        }
      }
    ],
    "assay": {
      "en": "Mogroside V by the agreed chromatographic method; total mogrosides, residual sugars and carrier fraction listed separately.",
      "zh": "甜苷 V 采用约定色谱方法；总甜苷、残留糖及载体比例分别列示。"
    },
    "quality": {
      "en": "Refined extract and non-selective aqueous decoction have different compositions and regulatory histories. Qualification must match the actual material and destination use.",
      "zh": "精制提取物与非选择性水煎液的组成及法规背景不同，资质评估须对应实际原料和目的地用途。"
    },
    "application": {
      "en": "Monk fruit extract can replace part of sucrose's sweetness, but not the solids and structure sucrose contributes. Beverage aftertaste, dairy texture and cookie structure need separate evaluation.",
      "zh": "罗汉果提取物可替代部分蔗糖的甜味，但不能补足蔗糖提供的固形物和结构；饮料后味、乳品质构及饼干结构需分别评价。"
    },
    "faq": {
      "en": "Is Mogroside V content the same as sweetness per gram of a blend?",
      "zh": "甜苷 V 含量等于复配粉每克甜度吗？"
    },
    "answer": {
      "en": "No. Carrier level and other sweeteners change sweetness per gram. We quote the extract or complete blend on its declared composition.",
      "zh": "不是。载体比例及其他甜味剂会改变单位质量甜度，提取物与完整复配粉按各自组成报价。"
    },
    "sources": [
      20,
      26
    ],
    "benefits": [
      {
        "en": "Competitive bulk quotations distinguish the Mogroside V extract from the complete sweetener blend, so the price corresponds to the composition you receive.",
        "zh": "有竞争力的批量报价区分罗汉果甜苷 V 提取物与完整复配甜味剂，让价格对应实际供应组成。"
      },
      {
        "en": "Separate V, residual-sugar and carrier requirements give repeat orders a consistent composition-based acceptance standard.",
        "zh": "分别约定甜苷 V、残留糖及载体要求，为复购提供一致的成分验收标准。"
      },
      {
        "en": "Material- and market-specific documentation support helps buyers assess the chosen extract without confusing refined sweetener material with a fruit decoction.",
        "zh": "按原料及市场提供资料支持，帮助采购方审核所选提取物，避免将精制甜味原料与果实水煎液混同。"
      },
      {
        "en": "Sample and bulk-order coordination connects the selected extract or blend with agreed packaging, documents and delivery terms.",
        "zh": "协同安排样品与批量订单，为所选提取物或复配原料明确包装、文件及交付条件。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Selective mogroside enrichment removes a different fruit-solids profile than non-selective water extraction.",
        "zh": "选择性甜苷富集与非选择性水提形成不同的果实固形物组成。"
      },
      "equipment": {
        "en": "Separation and drying choices influence monk-fruit colour, residual sugars and blend handling.",
        "zh": "分离与干燥选择影响罗汉果色泽、残留糖及复配使用表现。"
      },
      "applications": {
        "en": "Monk-fruit notes compare sparkling drinks, cultured desserts and cookies with separate sugar-reduction targets.",
        "zh": "罗汉果笔记比较气泡饮、发酵甜品及饼干各自的减糖目标。"
      },
      "standards": {
        "en": "Mogroside V and total-mogroside methods use distinct analyte definitions and reporting bases.",
        "zh": "罗汉果甜苷 V 与总甜苷方法采用不同的分析对象定义及报告基准。"
      },
      "insights": {
        "en": "Refined monk-fruit assessments cannot be transferred to fruit decoctions without matching material identity.",
        "zh": "精制罗汉果评估不能脱离原料身份直接套用于果实水煎液。"
      }
    }
  },
  {
    "id": "ginseng",
    "name": {
      "en": "Ginseng Extract",
      "zh": "人参提取物"
    },
    "identity": {
      "en": "Panax ginseng C.A.Mey. · root extract",
      "zh": "Panax ginseng C.A.Mey. · 根提取物"
    },
    "offer": {
      "en": "ZL Botanicals supplies ginseng extract for powder blends, capsules and beverage development. We match white- or red-ginseng processing and the ginsenoside profile to your powder, capsule or liquid project.",
      "zh": "振隆供应人参提取物，服务粉剂、胶囊及饮料开发。我们按粉剂、胶囊或液体项目，匹配白参或红参加工方式及人参皂苷组成。"
    },
    "forms": [
      {
        "form": {
          "en": "White-ginseng dry extract",
          "zh": "白参干提取物"
        },
        "composition": {
          "en": "Dried-root input; solvent and extract ratio declared",
          "zh": "以干燥根为原料，列明溶剂和提取比"
        },
        "use": {
          "en": "Dry blending and encapsulation",
          "zh": "干粉混配与胶囊"
        }
      },
      {
        "form": {
          "en": "Red-ginseng extract",
          "zh": "红参提取物"
        },
        "composition": {
          "en": "Steam-processed root with its own ginsenoside profile",
          "zh": "蒸制根及相应皂苷组成"
        },
        "use": {
          "en": "Red-ginseng formulation projects",
          "zh": "红参配方项目"
        }
      },
      {
        "form": {
          "en": "Concentrate project",
          "zh": "浓缩液项目"
        },
        "composition": {
          "en": "Solids, carrier and marker concentration defined",
          "zh": "明确固形物、载体与标志物浓度"
        },
        "use": {
          "en": "Liquid blending",
          "zh": "液体混配"
        }
      }
    ],
    "assay": {
      "en": "The specification names individual ginsenosides and their sum using an agreed chromatographic method, such as HPLC, with plant part, processing history and dry-basis or as-is result stated. A total-saponin colour assay is a separate specification.",
      "zh": "指定人参皂苷单体及其总量采用约定色谱方法（如 HPLC），并注明部位、加工史及干基或原样基准。总皂苷比色值另列，不与色谱结果混用。"
    },
    "quality": {
      "en": "Species and root identity prevent substitution by other plants sold as ginseng. Steamed material needs process-related contaminant review as well as composition control.",
      "zh": "物种与根部身份用于防止其他俗称“参”的植物替代；蒸制原料除成分外还需关注加工相关污染物。"
    },
    "application": {
      "en": "Bitterness and native solids matter in a citrus drink or ginger sachet; flow and blend uniformity matter in a capsule. Intended food use and population require market-specific review.",
      "zh": "柑橘饮料或姜味条包关注苦味与原生固形物，胶囊关注流动性及混合均匀性。食品用途及适用人群按目标市场复核。"
    },
    "faq": {
      "en": "Are white and red ginseng interchangeable at equal extract weight?",
      "zh": "白参与红参能按同样提取物重量替换吗？"
    },
    "answer": {
      "en": "No. Steaming changes the profile. We keep processing history and named-marker requirements in the quotation rather than comparing extraction ratios alone.",
      "zh": "不能。蒸制会改变组成，报价保留加工史和指定标志物要求，而非只比较提取比。"
    },
    "sources": [
      11,
      14
    ],
    "benefits": [
      {
        "en": "Competitive root-extract pricing distinguishes white and red ginseng and the named ginsenoside profile.",
        "zh": "人参根提取物按白参、红参及指定皂苷组成提供有竞争力的价格。"
      },
      {
        "en": "Root identity, steaming history and method-defined ginsenosides give repeat orders clear acceptance criteria.",
        "zh": "根部身份、蒸制历史与方法明确的人参皂苷指标，为复购提供清晰验收依据。"
      },
      {
        "en": "Ginseng qualification support links the selected root preparation to the documents required for its intended market.",
        "zh": "人参资质支持将所选根部制备物与目标市场所需资料对应。"
      },
      {
        "en": "We coordinate ginseng samples and bulk orders for the chosen powder or concentrate, with packaging and delivery terms in writing.",
        "zh": "我们按所选人参粉末或浓缩液协调样品与大货，书面确认包装及交付条件。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Steaming and extraction change the ginsenoside profile of white- and red-ginseng preparations.",
        "zh": "蒸制与提取会改变白参及红参制备物的人参皂苷组成。"
      },
      "equipment": {
        "en": "Ginseng steaming, concentration and drying steps address different root-processing requirements.",
        "zh": "人参蒸制、浓缩及干燥步骤分别对应不同的根部加工要求。"
      },
      "applications": {
        "en": "Ginseng formulation notes compare citrus drinks, ginseng–ginger sachets and capsule blends.",
        "zh": "人参配方笔记比较柑橘饮、人参姜味条包及胶囊混合粉。"
      },
      "standards": {
        "en": "Chromatographic ginsenoside profiles and total-saponin colour methods measure different quantities.",
        "zh": "色谱人参皂苷谱与总皂苷比色方法测量不同指标。"
      },
      "insights": {
        "en": "White-root and steam-processed-root evidence depends on the preparation actually studied.",
        "zh": "白参根与蒸制根的研究依据取决于实际使用的制备物。"
      }
    }
  },
  {
    "id": "reishi-mushroom",
    "name": {
      "en": "Reishi Mushroom Extract",
      "zh": "灵芝提取物"
    },
    "identity": {
      "en": "Ganoderma spp. · species and fungal part specified per grade",
      "zh": "Ganoderma 属 · 按规格明确物种及真菌部位"
    },
    "offer": {
      "en": "ZL Botanicals supplies reishi extract for capsule, powder-blend and selected drink projects. We match water-extract or triterpenoid-oriented options to your formulation, with species, fungal part and beta-glucan requirements stated separately in the quote.",
      "zh": "振隆供应灵芝提取物，服务胶囊、干混粉及特定饮品项目。我们按配方匹配水提或三萜型选项，报价分别列明物种、真菌部位及 β-葡聚糖要求。"
    },
    "forms": [
      {
        "form": {
          "en": "Water-extract dry powder",
          "zh": "水提干粉"
        },
        "composition": {
          "en": "Water-extractable constituents; beta-glucan target separately defined",
          "zh": "水提组分；β-葡聚糖目标单独定义"
        },
        "use": {
          "en": "Dry blends and selected drink projects",
          "zh": "干混粉及特定饮品项目"
        }
      },
      {
        "form": {
          "en": "Triterpenoid-oriented extract",
          "zh": "三萜型提取物"
        },
        "composition": {
          "en": "Alcohol-extraction profile and residual solvent declared",
          "zh": "明确醇提组成及溶剂残留要求"
        },
        "use": {
          "en": "Composition-led solid-dose projects",
          "zh": "以成分为重点的固体制剂项目"
        }
      },
      {
        "form": {
          "en": "Fungal powder comparison",
          "zh": "真菌粉对照选型"
        },
        "composition": {
          "en": "Whole tissue, mycelium and spores are not extract equivalents",
          "zh": "组织粉、菌丝体及孢子不等同于提取物"
        },
        "use": {
          "en": "Separate identity and handling qualification",
          "zh": "单独确认身份及使用表现"
        }
      }
    ],
    "assay": {
      "en": "The beta-glucan specification includes an agreed mushroom-method version and dry-basis or as-is result. Alpha-glucans and relevant starch controls are reported separately; total polysaccharides are not a substitute. Triterpenoids need their own assay method and basis.",
      "zh": "β-葡聚糖含量须约定适用于蘑菇原料的方法版本及干基或原样基准。α-葡聚糖与相关淀粉控制另列，总多糖不能替代 β-葡聚糖指标；三萜另行约定检测方法及基准。"
    },
    "quality": {
      "en": "G. lucidum and G. lingzhi are not automatic synonyms. Record authenticated species, fungal part, cultivation substrate, carrier and microbiological limits.",
      "zh": "G. lucidum 与 G. lingzhi 不可自动视为同义名。记录鉴定物种、真菌部位、培养基质、载体及微生物限值。"
    },
    "application": {
      "en": "Cocoa and oat formats can accommodate fungal notes better than a clear drink. Solubility, sediment and bitterness still need sample trials; food eligibility is material- and market-specific.",
      "zh": "可可燕麦体系相较清饮更能容纳真菌风味，但溶解性、沉淀与苦味仍需样品试验；食品适用性取决于原料及市场。"
    },
    "faq": {
      "en": "Does a high polysaccharide value establish beta-glucan content?",
      "zh": "多糖值高就代表 β-葡聚糖高吗？"
    },
    "answer": {
      "en": "No. Total-sugar methods may include other carbohydrates. Specify beta-glucan and relevant starch controls when that is the purchase target.",
      "zh": "不是。总糖方法可能包含其他碳水化合物；以 β-葡聚糖为采购目标时须明确其检测及相关淀粉控制。"
    },
    "sources": [
      15,
      23,
      28
    ],
    "benefits": [
      {
        "en": "Competitive reishi quotations separate water extracts from triterpenoid-oriented materials, with pricing tied to fungal identity and assay requirements.",
        "zh": "灵芝水提与三萜型原料分别提供有竞争力的报价，价格对应真菌身份及检测要求。"
      },
      {
        "en": "Separate beta-glucan and triterpenoid criteria support consistent acceptance of the selected reishi material.",
        "zh": "分别约定 β-葡聚糖与三萜指标，为所选灵芝原料提供一致验收依据。"
      },
      {
        "en": "Reishi document support keeps species, fungal part and cultivation substrate linked to material and market qualification.",
        "zh": "灵芝资料支持将物种、真菌部位及培养基质与原料和市场资质审核对应。"
      },
      {
        "en": "Reishi sample and bulk planning includes the agreed composition, moisture protection and packaging in written shipping terms.",
        "zh": "灵芝样品与大货计划将约定组成、防潮及包装要求纳入书面运输条件。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Water and alcohol extraction recover different Ganoderma constituent profiles.",
        "zh": "水提与醇提获得不同的灵芝属组分组成。"
      },
      "equipment": {
        "en": "Fungal extraction and powder drying must account for insoluble tissue and substrate-derived material.",
        "zh": "真菌提取及粉体干燥需考虑不溶组织与培养基质来源材料。"
      },
      "applications": {
        "en": "Reishi notes compare cocoa–oat blends, cultured-food trials and capsule formats.",
        "zh": "灵芝笔记比较可可燕麦混合粉、发酵食品试验及胶囊形态。"
      },
      "standards": {
        "en": "Mushroom glucan methods distinguish beta-glucans from alpha-glucan and starch contributions.",
        "zh": "蘑菇葡聚糖方法区分 β-葡聚糖与 α-葡聚糖及淀粉的贡献。"
      },
      "insights": {
        "en": "Ganoderma species, fungal part and extraction history limit how study findings can be compared.",
        "zh": "灵芝属物种、真菌部位及提取史限定研究结果的可比范围。"
      }
    }
  },
  {
    "id": "ginkgo-biloba",
    "name": {
      "en": "Ginkgo Biloba Extract",
      "zh": "银杏叶提取物"
    },
    "identity": {
      "en": "Ginkgo biloba L. · leaf extract, not seed material",
      "zh": "Ginkgo biloba L. · 叶提取物，非种子原料"
    },
    "offer": {
      "en": "ZL Botanicals supplies ginkgo leaf extract for capsule and tablet development, subject to material and target-market qualification. Our quotations cover flavonoid glycosides, terpene lactones and ginkgolic-acid controls; destination requirements are agreed before sample approval.",
      "zh": "振隆供应面向胶囊及片剂开发的银杏叶提取物，按具体原料及目标市场确认用途。报价围绕黄酮苷、萜内酯及银杏酸控制展开，样品确认前明确目的地要求。"
    },
    "forms": [
      {
        "form": {
          "en": "Refined dry leaf extract",
          "zh": "精制叶干提取物"
        },
        "composition": {
          "en": "Defined flavonoid and terpene-lactone groups",
          "zh": "明确黄酮与萜内酯组分"
        },
        "use": {
          "en": "Qualified capsule or tablet projects",
          "zh": "经用途评估的胶囊或片剂项目"
        }
      },
      {
        "form": {
          "en": "Carrier-containing preparation",
          "zh": "含载体制备物"
        },
        "composition": {
          "en": "Native extract and carrier reported separately",
          "zh": "原生提取物与载体分别列示"
        },
        "use": {
          "en": "Flow and dosing development",
          "zh": "流动性与定量开发"
        }
      },
      {
        "form": {
          "en": "Crude leaf material comparison",
          "zh": "粗叶原料对照"
        },
        "composition": {
          "en": "Leaf powder is not equivalent to refined extract",
          "zh": "叶粉不等同于精制提取物"
        },
        "use": {
          "en": "Separate qualification, not automatic substitution",
          "zh": "单独评估，不直接替换"
        }
      }
    ],
    "assay": {
      "en": "Flavonoid glycosides, ginkgolides and bilobalide need defined methods. A 24/6 enquiry refers to flavonoid-glycoside and terpene-lactone group targets, with analytical methods, reporting basis and ginkgolic-acid limit agreed separately. The written quotation confirms the available grade; the target does not establish clinical equivalence.",
      "zh": "黄酮苷、银杏内酯及白果内酯需明确方法。24/6 询价指黄酮苷与萜内酯的组分目标，检测方法、报告基准及银杏酸限值另行约定。具体可供规格以书面报价确认，该目标不代表临床等同性。"
    },
    "quality": {
      "en": "Ginkgolic-acid limits, chromatographic authenticity, residual solvents and carrier composition belong in the agreed specification. A high flavonoid assay alone cannot establish identity.",
      "zh": "约定规格应覆盖银杏酸限值、色谱真实性、溶剂残留及载体组成；高黄酮含量本身不能确证身份。"
    },
    "application": {
      "en": "The concepts below concern qualified dosage-form development, not ordinary drinks or automatic food permission. Medication interactions, bleeding risk and intended population require qualified review.",
      "zh": "以下概念用于经过评估的剂型开发，不代表普通饮料或自动获得食品许可。药物相互作用、出血风险及适用人群须经专业评估。"
    },
    "faq": {
      "en": "Can ginkgo extract be used as an ordinary beverage ingredient?",
      "zh": "银杏叶提取物可直接用于普通饮料吗？"
    },
    "answer": {
      "en": "This page does not establish that permission. Market, material and product category must be reviewed before formulation; an oral suspension is not a beverage.",
      "zh": "本页不建立此类许可。配方前须复核市场、原料及产品类别，口服混悬液不等于饮料。"
    },
    "sources": [
      2,
      10,
      13
    ],
    "benefits": [
      {
        "en": "Competitive ginkgo leaf pricing reflects refined-extract composition, authenticity controls and the volume needed for your dosage-form project.",
        "zh": "银杏叶按剂型项目所需精制提取物组成、真实性控制及采购量提供有竞争力的价格。"
      },
      {
        "en": "Flavonoid, terpene-lactone and ginkgolic-acid requirements give repeat ginkgo orders a defined acceptance basis.",
        "zh": "黄酮、萜内酯及银杏酸要求，为银杏叶复购提供明确验收依据。"
      },
      {
        "en": "Ginkgo qualification support helps teams review the leaf extract and destination product category before sample approval.",
        "zh": "银杏叶资质支持帮助团队在样品确认前审核叶提取物及目的地产品类别。"
      },
      {
        "en": "We coordinate ginkgo sample approval, bulk packaging and order documents with the delivery plan for capsule or tablet development.",
        "zh": "我们结合胶囊或片剂开发的交付计划，协调银杏叶样品确认、大货包装及订单文件。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Ginkgo leaf refinement changes constituent groups and removes unwanted source compounds.",
        "zh": "银杏叶精制改变组分构成，并去除不需要的来源化合物。"
      },
      "equipment": {
        "en": "Refinement, solvent recovery and drying serve different stages of ginkgo leaf processing.",
        "zh": "精制、溶剂回收及干燥分别用于银杏叶加工的不同阶段。"
      },
      "applications": {
        "en": "Ginkgo formulation notes cover capsule, tablet and measured oral-suspension development.",
        "zh": "银杏叶配方笔记涵盖胶囊、片剂及定量口服混悬液开发。"
      },
      "standards": {
        "en": "Ginkgo authenticity assessment combines constituent-group analysis with impurity control.",
        "zh": "银杏叶真实性评估结合组分分析与杂质控制。"
      },
      "insights": {
        "en": "Evidence for specified medicinal ginkgo preparations does not authorize ordinary beverage use.",
        "zh": "特定药用银杏制备物的证据不构成普通饮料用途许可。"
      }
    }
  },
  {
    "id": "grape-seed",
    "name": {
      "en": "Grape Seed Extract",
      "zh": "葡萄籽提取物"
    },
    "identity": {
      "en": "Vitis vinifera · seed extract",
      "zh": "Vitis vinifera · 籽提取物"
    },
    "offer": {
      "en": "ZL Botanicals supplies grape seed extract for capsules, drinks and topical development. Our quotation combines seed-derived polyphenol identity, a defined OPC method and powder composition with the handling requirements of your formula.",
      "zh": "振隆供应葡萄籽提取物，用于胶囊、饮品及外用开发。报价将籽源多酚身份、明确的 OPC 方法及粉体组成，与配方所需使用表现对应。"
    },
    "forms": [
      {
        "form": {
          "en": "Broad seed extract",
          "zh": "常规籽提取物"
        },
        "composition": {
          "en": "Seed-derived polyphenol mixture",
          "zh": "籽来源的多酚混合物"
        },
        "use": {
          "en": "Botanical dry blends",
          "zh": "植物干混粉"
        }
      },
      {
        "form": {
          "en": "Proanthocyanidin-enriched fraction",
          "zh": "原花青素富集组分"
        },
        "composition": {
          "en": "Oligomer/polymer definition and method declared",
          "zh": "明确低聚／聚合范围与方法"
        },
        "use": {
          "en": "Assay-led ingredient projects",
          "zh": "以含量为重点的原料项目"
        }
      },
      {
        "form": {
          "en": "Carrier-containing powder",
          "zh": "含载体粉末"
        },
        "composition": {
          "en": "Native extract and drying carrier distinguished",
          "zh": "区分原生提取物与干燥载体"
        },
        "use": {
          "en": "Handling and dispersion development",
          "zh": "使用及分散性开发"
        }
      }
    ],
    "assay": {
      "en": "OPC needs a degree-of-polymerization definition, method and reference standard. Total phenolics, colour reactions and chromatographic oligomer fractions are not interchangeable.",
      "zh": "OPC 需明确聚合度范围、方法及对照品。总酚、显色反应与色谱低聚组分不能互换。"
    },
    "quality": {
      "en": "Chromatographic identity and adulteration risk controls matter alongside assay. Include seed traceability, extraction solvent and relevant allergen declarations.",
      "zh": "色谱身份与掺假风险控制和含量同样重要，同时纳入籽原料追溯、提取溶剂及相关过敏原声明。"
    },
    "application": {
      "en": "Astringency and protein interactions matter in drinks; colour and oxidation matter in a serum. Assess the offered sample in the full formula rather than transferring a laboratory antioxidant result.",
      "zh": "饮品关注涩感及蛋白相互作用，精华关注色泽与氧化。用所报样品评价完整配方，不把实验室抗氧化结果套用于成品。"
    },
    "faq": {
      "en": "Can two OPC percentages be compared directly?",
      "zh": "两个 OPC 百分比能直接比较吗？"
    },
    "answer": {
      "en": "Only when method, reference standard and reporting basis match. Our quotation process keeps these fields beside the target assay.",
      "zh": "只有方法、对照品及报告基准一致时才有可比性，报价会将这些信息与目标含量并列。"
    },
    "sources": [
      2,
      10,
      20
    ],
    "benefits": [
      {
        "en": "Match your ingredient budget to the selected assay, form and order volume, with commercial terms set out in one quotation.",
        "zh": "围绕选定含量、形态和采购量报价，让原料预算对应实际采购物。"
      },
      {
        "en": "Seed identity, a defined assay method and agreed acceptance criteria give QA and production a practical basis for lot review.",
        "zh": "籽源鉴定、明确检测方法与约定验收指标，为质检和生产提供批次审核依据。"
      },
      {
        "en": "Get support with the technical and certification documentation relevant to your selected material and destination market.",
        "zh": "协助对接所选原料及目标市场需要的技术与认证资料。"
      },
      {
        "en": "Coordinate samples, commercial quantities and replenishment around your production schedule, with shipping arrangements confirmed for the order.",
        "zh": "根据生产计划衔接样品、大货与补货，并在订单中确认运输安排。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Grape-seed fractionation changes the oligomer and polymer distribution of its polyphenols.",
        "zh": "葡萄籽分级会改变多酚中低聚体与聚合体的分布。"
      },
      "equipment": {
        "en": "Seed extraction, filtration and drying influence colour and the handling of polyphenol powders.",
        "zh": "籽原料提取、过滤及干燥影响多酚粉体的色泽与使用表现。"
      },
      "applications": {
        "en": "Grape-seed notes compare berry drinks, capsule powders and cosmetic gel-serum combinations.",
        "zh": "葡萄籽笔记比较莓果饮、胶囊粉末及化妆品凝胶精华组合。"
      },
      "standards": {
        "en": "OPC interpretation depends on polymerization range, reference standard and analytical method.",
        "zh": "OPC 解读取决于聚合度范围、对照品及分析方法。"
      },
      "insights": {
        "en": "Studies of named grape-seed preparations have material-specific outcomes and limitations.",
        "zh": "特定葡萄籽制备物的研究结果与局限均对应其实际原料。"
      }
    }
  },
  {
    "id": "goji-berry",
    "name": {
      "en": "Goji Berry Extract",
      "zh": "枸杞提取物"
    },
    "identity": {
      "en": "Lycium barbarum · fruit-derived ingredient",
      "zh": "Lycium barbarum · 果实来源原料"
    },
    "offer": {
      "en": "ZL Botanicals supplies goji fruit ingredients for instant drinks, fruit gummies and defined-extract formulations. Our quotations distinguish juice-solids powders from polysaccharide fractions, with fruit solids, sugars and drying carriers stated for the selected material.",
      "zh": "振隆供应枸杞果实原料，用于冲调饮料、果味软糖及明确组分的提取物配方。报价区分果汁固形物粉与多糖组分，并按所选材料列明果实固形物、糖及干燥载体。"
    },
    "forms": [
      {
        "form": {
          "en": "Juice-derived powder",
          "zh": "果汁来源粉末"
        },
        "composition": {
          "en": "Juice solids and drying carrier declared",
          "zh": "列明果汁固形物与干燥载体"
        },
        "use": {
          "en": "Instant fruit drinks",
          "zh": "即溶果味饮品"
        }
      },
      {
        "form": {
          "en": "Aqueous fruit extract",
          "zh": "果实水提物"
        },
        "composition": {
          "en": "Broad soluble fruit composition",
          "zh": "较广的果实可溶组分"
        },
        "use": {
          "en": "Fruit-flavoured blends",
          "zh": "果味复配"
        }
      },
      {
        "form": {
          "en": "Polysaccharide-oriented fraction",
          "zh": "多糖型组分"
        },
        "composition": {
          "en": "Free sugars and polysaccharides distinguished",
          "zh": "区分游离糖与多糖"
        },
        "use": {
          "en": "Defined-fraction dry products",
          "zh": "组分明确的干粉产品"
        }
      }
    ],
    "assay": {
      "en": "Polysaccharide method, free-sugar correction and reporting basis must be defined. Betaine and carotenoids are separate targets, not synonyms for polysaccharides.",
      "zh": "明确多糖方法、游离糖校正及报告基准。甜菜碱和类胡萝卜素是独立指标，不是多糖的同义词。"
    },
    "quality": {
      "en": "Fruit identity, sugar and carrier composition, microbiology and moisture controls support consistent reconstitution. A whole-berry study does not qualify an extract batch.",
      "zh": "果实身份、糖与载体组成、微生物及水分控制用于保持复溶表现；整果研究不能用于确认提取物批次。"
    },
    "application": {
      "en": "Instant sachets need reconstitution and caking trials. Gummies need heat, acid, colour and water-activity checks; defined fractions need blend-uniformity evaluation.",
      "zh": "条包需评价复溶与结块；软糖需评价热、酸、色泽及水分活度；明确组分的粉剂需评价混合均匀性。"
    },
    "faq": {
      "en": "Is a high total-sugar result a goji polysaccharide specification?",
      "zh": "总糖高就是枸杞多糖规格吗？"
    },
    "answer": {
      "en": "No. Free sugars can dominate a fruit powder. We separate fruit-solids, carrier and polysaccharide requirements in the quotation.",
      "zh": "不是。果粉可能以游离糖为主，报价会区分果实固形物、载体及多糖要求。"
    },
    "sources": [
      12,
      24
    ],
    "benefits": [
      {
        "en": "Quote fruit powder and enriched-extract requirements separately, so your budget does not confuse fruit solids with assayed polysaccharides.",
        "zh": "果粉与多糖富集物分别报价，让采购预算对应果实固形物或明确测定的多糖指标。"
      },
      {
        "en": "Identity, carrier declaration and method-defined acceptance criteria support sample approval and repeat-order consistency.",
        "zh": "原料身份、载体声明和有方法依据的验收指标，支持样品认可及复购一致性。"
      },
      {
        "en": "Bring the technical and certification document requirements into the material discussion, with the applicable scope matched to the selected supply.",
        "zh": "在材料方案中对接技术与认证文件需求，将资料范围落实到所选供应。"
      },
      {
        "en": "Plan trial quantities and bulk replenishment with order-specific packaging, shipping and timing arrangements.",
        "zh": "按项目安排试用量和后续补货，逐单确认包装、运输与时间。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Juice concentration and polysaccharide fractionation produce different goji ingredient compositions.",
        "zh": "果汁浓缩与多糖分级形成不同的枸杞原料组成。"
      },
      "equipment": {
        "en": "Goji separation and drying choices affect free-sugar removal, carrier needs and reconstitution.",
        "zh": "枸杞分离与干燥选择影响游离糖去除、载体需求及复溶。"
      },
      "applications": {
        "en": "Goji notes compare instant drinks, fruit gummies and characterized-fraction capsules.",
        "zh": "枸杞笔记比较冲调饮、果味软糖及已表征组分胶囊。"
      },
      "standards": {
        "en": "Molecular-weight and monosaccharide analysis answer identity questions beyond total-sugar assays.",
        "zh": "分子量与单糖分析回答总糖检测之外的身份问题。"
      },
      "insights": {
        "en": "Whole-berry pilot findings and isolated goji-fraction studies apply to different materials.",
        "zh": "枸杞整果试点结果与分离组分研究适用于不同材料。"
      }
    }
  },
  {
    "id": "licorice-root",
    "name": {
      "en": "Licorice Root Extract",
      "zh": "甘草提取物"
    },
    "identity": {
      "en": "Glycyrrhiza spp. · root / stolon; G. glabra specified for glabridin projects",
      "zh": "Glycyrrhiza 属 · 根／根状茎；光甘草定项目明确 G. glabra"
    },
    "offer": {
      "en": "ZL Botanicals supplies licorice extract for flavour and specialist ingredient projects. Conventional extract, DGL and glabridin-oriented material receive separate composition briefs so the product matches its intended use.",
      "zh": "振隆供应甘草提取物，服务风味及专项原料项目。常规提取物、DGL 和光甘草定型原料分别确定组成要求，按用途匹配产品。"
    },
    "forms": [
      {
        "form": {
          "en": "Conventional root extract",
          "zh": "常规根提取物"
        },
        "composition": {
          "en": "Glycyrrhizin-bearing mixture; species declared",
          "zh": "含甘草酸的混合物，明确物种"
        },
        "use": {
          "en": "Permitted flavour applications",
          "zh": "符合许可的风味应用"
        }
      },
      {
        "form": {
          "en": "DGL project",
          "zh": "DGL 项目"
        },
        "composition": {
          "en": "Reduced glycyrrhizin with a defined residual limit",
          "zh": "降低甘草酸并明确残留限值"
        },
        "use": {
          "en": "Qualified oral formulation projects",
          "zh": "经评估的口服配方项目"
        }
      },
      {
        "form": {
          "en": "Glabridin-oriented fraction",
          "zh": "光甘草定型组分"
        },
        "composition": {
          "en": "Authenticated G. glabra; separate glabridin assay",
          "zh": "鉴定 G. glabra，光甘草定单独检测"
        },
        "use": {
          "en": "Topical formulation development",
          "zh": "外用配方开发"
        }
      }
    ],
    "assay": {
      "en": "Glycyrrhizin/glycyrrhizic acid, its salts, glycyrrhetinic acid and glabridin are different specification items. DGL does not mean zero residue.",
      "zh": "甘草酸及其盐、甘草次酸与光甘草定是不同规格项目；DGL 不代表零残留。"
    },
    "quality": {
      "en": "Species, residual glycyrrhizin, solvent and carrier declarations are material-specific. Oral use requires review of blood-pressure, potassium and drug-interaction risks; DGL is not a universal safety guarantee.",
      "zh": "物种、甘草酸残留、溶剂及载体声明按原料确认。口服需评估血压、血钾及药物相互作用风险，DGL 不是通用安全保证。"
    },
    "application": {
      "en": "Flavour concentrates, DGL chewables and topical emulsions need different materials. Concepts below are not approvals or treatment claims; glabridin precipitation matters in topical development.",
      "zh": "风味基料、DGL 咀嚼片和外用乳液需要不同原料。以下概念不是许可或治疗声称；外用开发需关注光甘草定析晶。"
    },
    "faq": {
      "en": "Can a DGL extract replace a glabridin cosmetic ingredient?",
      "zh": "DGL 能替代光甘草定化妆品原料吗？"
    },
    "answer": {
      "en": "Not by name or equal mass. Removing glycyrrhizin does not define glabridin content, solubility or the cosmetic vehicle. Quote each project separately.",
      "zh": "不能仅凭名称或等质量替换。去除甘草酸不确定光甘草定含量、溶解性或化妆品载体，两类项目分别报价。"
    },
    "sources": [
      1,
      8
    ],
    "benefits": [
      {
        "en": "Keep conventional extract, DGL and glabridin-focused requirements separate in the quote so your budget follows the fraction and specification you intend to use.",
        "zh": "将常规提取物、DGL 与光甘草定需求分别报价，让预算对应实际使用的组分和规格。"
      },
      {
        "en": "Species identity, the relevant assay and residual limits give your QA team a defined basis for qualification and repeat supply.",
        "zh": "物种身份、适用含量方法及残留限度，为供应审核和复购提供明确依据。"
      },
      {
        "en": "Coordinate the applicable technical and certification documents for the selected supply and intended market, rather than treating one document as covering every licorice derivative.",
        "zh": "针对选定供应和目标市场协调适用技术与认证文件，不将单份文件扩展为所有甘草衍生物的通用证明。"
      },
      {
        "en": "Align sample evaluation and bulk purchasing with the production schedule, with packaging and shipping arrangements confirmed in the commercial offer.",
        "zh": "衔接样品评价与大货采购，在商务报价中确认包装和运输安排。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Glycyrrhizin depletion and glabridin enrichment are distinct licorice fractionation objectives.",
        "zh": "去除甘草酸与富集光甘草定是不同的甘草分级目标。"
      },
      "equipment": {
        "en": "Licorice separation and premix preparation depend on the selected fraction and solvent system.",
        "zh": "甘草分离与预混配制取决于所选组分及溶剂体系。"
      },
      "applications": {
        "en": "Licorice notes compare DGL chewables, glabridin emulsions and cocoa–vanilla flavour concentrates.",
        "zh": "甘草笔记比较 DGL 咀嚼片、光甘草定乳液及可可香草风味基料。"
      },
      "standards": {
        "en": "Residual glycyrrhizin and glabridin each require their own analytical definition and quantitation basis.",
        "zh": "甘草酸残留与光甘草定分别需要明确分析定义及定量基准。"
      },
      "insights": {
        "en": "Licorice safety evidence depends on glycyrrhizin exposure, the preparation and the intended population.",
        "zh": "甘草安全证据取决于甘草酸暴露量、制备物及目标人群。"
      }
    }
  },
  {
    "id": "stevia",
    "name": {
      "en": "Stevia Glycoside Extract",
      "zh": "甜菊糖苷提取物"
    },
    "identity": {
      "en": "Stevia rebaudiana · leaf-derived glycosides; other production routes declared separately",
      "zh": "Stevia rebaudiana · 叶来源糖苷；其他生产路线另行声明"
    },
    "offer": {
      "en": "ZL Botanicals supplies stevia glycoside ingredients for reduced-sugar drinks, protein beverages and dry sweetener blends. Quotations cover the named glycoside profile, production route and carrier composition, with grade and sample options matched to your formula.",
      "zh": "振隆供应甜菊糖苷原料，用于减糖饮料、蛋白饮品及干粉甜味剂配方。报价列明糖苷组成、生产路线和载体成分，并按配方需求确认规格与样品选项。"
    },
    "forms": [
      {
        "form": {
          "en": "Refined leaf glycosides",
          "zh": "精制叶来源糖苷"
        },
        "composition": {
          "en": "Named glycoside profile and leaf-extraction route",
          "zh": "明确糖苷组成及叶提取路线"
        },
        "use": {
          "en": "Food and beverage sweetening subject to market scope",
          "zh": "按市场许可用于食品饮料甜味开发"
        }
      },
      {
        "form": {
          "en": "Reb D / Reb M glycoside options",
          "zh": "Reb D／Reb M 糖苷选项"
        },
        "composition": {
          "en": "Production route and individual proportions declared",
          "zh": "声明生产路线及单体比例"
        },
        "use": {
          "en": "Taste-led reduced-sugar formulas",
          "zh": "以口感为重点的减糖配方"
        }
      },
      {
        "form": {
          "en": "Formulated sweetener blend",
          "zh": "复配甜味剂"
        },
        "composition": {
          "en": "Glycosides plus specified carrier or co-sweetener",
          "zh": "糖苷配合明确载体或其他甜味剂"
        },
        "use": {
          "en": "Dry mixes and portioned sachets",
          "zh": "干混粉及定量小袋"
        }
      }
    ],
    "assay": {
      "en": "The requested specification lists total steviol glycosides, the individual glycoside profile and an HPLC method suited to that composition. The quotation identifies dry or as-is assay basis; blends also state the glycoside concentration and carrier or co-sweetener composition.",
      "zh": "需求规格分别列明总甜菊糖苷、单体糖苷组成及适用于该组成的 HPLC 方法。报价注明干基或原样含量基准；复配规格同时列明糖苷浓度及载体或其他甜味剂成分。"
    },
    "quality": {
      "en": "Leaf extraction, fermentation and enzyme conversion require distinct identity and regulatory records. Crude stevia leaf is not equivalent to a refined sweetener ingredient.",
      "zh": "叶提取、发酵及酶转化需分别记录身份与法规依据；粗甜菊叶不等同于精制甜味剂原料。"
    },
    "application": {
      "en": "Aftertaste, cold-storage precipitation and interactions with acid or protein determine the useful grade. When sugar is reduced, the formula also needs to account for body and dissolved solids.",
      "zh": "后味、冷藏析出及与酸或蛋白的相互作用决定规格适配性，减糖后，配方还需兼顾口感厚度与可溶性固形物。"
    },
    "faq": {
      "en": "Does a higher total glycoside assay guarantee a better taste?",
      "zh": "总糖苷越高，口感就越好吗？"
    },
    "answer": {
      "en": "No. Individual glycosides, concentration and the food matrix determine the sensory result. Compare samples in the finished formula.",
      "zh": "不是。单体糖苷、用量及食品体系共同决定感官结果，应在成品配方中比较样品。"
    },
    "sources": [
      1,
      2,
      5
    ],
    "benefits": [
      {
        "en": "Competitive stevia quotations distinguish named glycosides from complete sweetener blends, with cost based on the supplied composition.",
        "zh": "甜菊糖苷与完整复配甜味剂分别提供有竞争力的报价，成本对应实际供应组成。"
      },
      {
        "en": "Defined glycoside profiles, reporting basis and carrier declarations give repeat stevia orders consistent acceptance criteria.",
        "zh": "明确糖苷组成、报告基准及载体声明，为甜菊原料复购提供一致验收指标。"
      },
      {
        "en": "Stevia documentation support matches leaf-extraction, fermentation or conversion records to the selected grade and market.",
        "zh": "甜菊资料支持将叶提取、发酵或转化记录与所选规格及市场对应。"
      },
      {
        "en": "We coordinate stevia samples and bulk quantities with the agreed blend composition, moisture-protective packaging and shipping terms.",
        "zh": "我们按约定复配组成、防潮包装及运输条件协调甜菊原料样品与批量交付。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Leaf extraction, fermentation and enzyme conversion use different processing and purification steps.",
        "zh": "叶提取、发酵及酶转化采用不同的加工与纯化步骤。"
      },
      "equipment": {
        "en": "Separation, bioconversion and blend preparation require route-specific processing equipment.",
        "zh": "分离、生物转化及复配制备需要与路线对应的加工设备。"
      },
      "applications": {
        "en": "Stevia notes compare citrus beverages, protein drinks and portioned sweetener sachets.",
        "zh": "甜菊笔记比较柑橘饮料、蛋白饮品及定量甜味剂小袋。"
      },
      "standards": {
        "en": "The glycoside method must cover the declared profile, including constituents beyond Reb A, D and M.",
        "zh": "糖苷方法需覆盖声明的组成，包括 Reb A、D、M 之外的组分。"
      },
      "insights": {
        "en": "Processing-aid assessments and refined-glycoside permissions are specific to route, material and market.",
        "zh": "加工助剂评估与精制糖苷许可对应具体路线、原料及市场。"
      }
    }
  },
  {
    "id": "resveratrol",
    "name": {
      "en": "Resveratrol",
      "zh": "白藜芦醇"
    },
    "identity": {
      "en": "Trans-resveratrol · source, production route and purification specified by grade",
      "zh": "反式白藜芦醇 · 按规格列明来源、生产路线及纯化信息"
    },
    "offer": {
      "en": "ZL Botanicals supplies resveratrol for capsule blends and topical formulation development. Quotations identify trans-resveratrol content, source and impurity requirements; powder and carrier-based options are confirmed for the intended format.",
      "zh": "振隆供应白藜芦醇，用于胶囊混合粉及外用配方开发。报价列明反式白藜芦醇含量、来源与杂质要求，并按产品形态确认粉末或载体配制选项。"
    },
    "forms": [
      {
        "form": {
          "en": "Purified trans-resveratrol powder",
          "zh": "纯化反式白藜芦醇粉末"
        },
        "composition": {
          "en": "Trans assay, cis/related compounds and source declared",
          "zh": "列明反式含量、顺式／相关物质及来源"
        },
        "use": {
          "en": "Dry blending and encapsulation projects",
          "zh": "干混粉与胶囊项目"
        }
      },
      {
        "form": {
          "en": "Knotweed-derived extract option",
          "zh": "虎杖来源提取物选项"
        },
        "composition": {
          "en": "Resveratrol, polydatin and source impurities distinguished",
          "zh": "区分白藜芦醇、虎杖苷及来源杂质"
        },
        "use": {
          "en": "Botanical ingredient formulas",
          "zh": "植物原料配方"
        }
      },
      {
        "form": {
          "en": "Carrier-based formulation option",
          "zh": "载体配制选项"
        },
        "composition": {
          "en": "Active loading and full carrier composition declared",
          "zh": "明确活性载量及完整载体组成"
        },
        "use": {
          "en": "Reconstitution or topical development",
          "zh": "复溶或外用开发"
        }
      }
    ],
    "assay": {
      "en": "The requested trans-resveratrol specification uses an agreed HPLC method that distinguishes cis isomer and relevant related substances, with dry or as-is basis stated. Polydatin is reported separately from free resveratrol.",
      "zh": "反式白藜芦醇需求规格采用约定的 HPLC 方法，区分顺式异构体及相关物质，并注明干基或原样基准。虎杖苷与游离白藜芦醇分别报告。"
    },
    "quality": {
      "en": "Knotweed-origin material needs source-specific impurity controls, including an agreed emodin requirement. Synthetic-material assessments do not automatically qualify botanical extracts.",
      "zh": "虎杖来源原料需控制来源相关杂质，包括约定的大黄素要求；合成原料评估不自动适用于植物提取物。"
    },
    "application": {
      "en": "Poor water solubility makes loading, crystallization and light/oxygen stability important. A dispersion concept is not evidence of improved clinical absorption or longevity.",
      "zh": "水溶性有限，因此载量、析晶及光氧稳定性重要。分散概念不代表临床吸收改善或延寿证据。"
    },
    "faq": {
      "en": "Is resveratrol another name for grape seed extract?",
      "zh": "白藜芦醇就是葡萄籽提取物吗？"
    },
    "answer": {
      "en": "No. Resveratrol is a named molecule; grape seed extract is a different mixture. We keep source, trans assay and carrier loading explicit in the quotation.",
      "zh": "不是。白藜芦醇是明确分子，葡萄籽提取物是另一类混合物。报价中分别明确来源、反式含量及载体载量。"
    },
    "sources": [
      3,
      4,
      5
    ],
    "benefits": [
      {
        "en": "Competitive resveratrol pricing separates purified powder, botanical extract and carrier-based options by trans content and supplied composition.",
        "zh": "白藜芦醇按纯化粉末、植物提取物及载体配制选项提供有竞争力的价格，报价对应反式含量与供应组成。"
      },
      {
        "en": "Trans-isomer identity, related-substance controls and carrier loading give repeat resveratrol orders a defined acceptance basis.",
        "zh": "反式身份、相关物质控制及载体载量，为白藜芦醇复购提供明确验收依据。"
      },
      {
        "en": "Resveratrol qualification support ties source and production-route records to the selected material and intended market.",
        "zh": "白藜芦醇资质支持将来源及生产路线记录与所选原料及目标市场对应。"
      },
      {
        "en": "Resveratrol sample and bulk planning includes the chosen form, light-protective packaging requirements and written delivery terms.",
        "zh": "白藜芦醇样品与大货计划包含所选形态、避光包装要求及书面交付条件。"
      }
    ],
    "reading": {
      "processes": {
        "en": "Purification, particle handling and carrier preparation depend on source and product form.",
        "zh": "纯化、粉体处理及载体配制取决于来源与产品形态。"
      },
      "equipment": {
        "en": "Resveratrol separation and dispersion equipment serve different purity and physical-form objectives.",
        "zh": "白藜芦醇分离与分散设备分别对应纯度及物理形态目标。"
      },
      "applications": {
        "en": "Resveratrol notes compare capsule blends, topical bases and reconstitution concepts.",
        "zh": "白藜芦醇笔记比较胶囊混合粉、外用基底及复溶概念。"
      },
      "standards": {
        "en": "Chromatographic specificity separates trans-resveratrol from isomers, polydatin and related substances.",
        "zh": "色谱专属性用于区分反式白藜芦醇、异构体、虎杖苷及相关物质。"
      },
      "insights": {
        "en": "Light and pH stability studies do not establish clinical absorption benefits for a dispersion.",
        "zh": "光照与 pH 稳定性研究不能证明分散体系具有临床吸收优势。"
      }
    }
  }
];
if(extractSales.length!==11 || new Set(extractSales.map(p=>p.id)).size!==11) throw new Error('Exactly eleven unique sales products required');
for(const p of extractSales){const pack=getIngredientReaderPack(p.id);if(!pack||p.sources.some(id=>!pack.sources.some(s=>s.id===id)))throw new Error(`Invalid sales research mapping: ${p.id}`);}
export function getExtractSale(id:string){return extractSales.find(p=>p.id===id);}
export function salesTitle(p:ExtractSale,lang:Language){return p.name[lang]+(lang==='zh'?'采购':' Procurement');}
