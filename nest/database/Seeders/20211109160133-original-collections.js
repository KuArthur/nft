'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('original_collections', [
    //   {
    //     name: 'Parallel Alpha',
    //     slug: 'parallelalpha',
    //     contract: '0x76be3b62873462d2142405439777e971754e8e77',
    //     total_volume: '47566.7527418969',
    //     items_count: '382',
    //     priority: '3',
    //     setting_listener: false
    //   },
    //   {
    //     name: 'blitmap',
    //     slug: 'blitmap',
    //     contract: '0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63',
    //     total_volume: '9093.4505',
    //     items_count: '1700',
    //     priority: '3',
    //     setting_listener: false
    //   },
    //   {
    //   name: 'Bored Ape Yacht Club',
    //   slug: 'boredapeyachtclub',
    //   contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    //   total_volume: '205082.310588782',
    //   items_count: '10000',
    //   priority: '2',
    //   setting_listener: false
    // },
    // {
    //   name: 'CryptoPunks',
    //   slug: 'cryptopunks',
    //   contract: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    //   total_volume: '706902.150249312',
    //   items_count: '9999',
    //   priority: '1',
    //   setting_listener: false
    // },
    //   { slug: 'boredapeyachtclub' },
    //   { slug: 'wolf-game' },
    //   { slug: 'sandbox' },
    //   { slug: 'mutant-ape-yacht-club' },
    //   { slug: 'cryptopunks' },
    //   { slug: 'doodles-official' },
    //   { slug: 'chain-runners-nft' },
    //   { slug: 'jrny-club-official' },
    //   { slug: 'decentraland' },
    //   { slug: 'cool-cats-nft' },
    //   { slug: 'collectvox' },
    //   { slug: 'bored-ape-kennel-club' },
    //   { slug: 'cryptoongoonz' },
    //   { slug: 'smilesssvrs' },
    //   { slug: 'feudalz' },
    //   { slug: 'cryptoadz-by-gremplin' },
    //   { slug: 'noundles' },
    //   { slug: 'wolf-game-land' },
    //   { slug: 'parallelalpha' },
    //   { slug: 'treeverse' },
    //   { slug: 'cryptomories' },
    //   { slug: 'cyberkongz' },
    //   { slug: 'cosmic-wyverns-official' },
    //   { slug: 'meebits' },
    //   { slug: 'gamblingapes' },
    //   { slug: 'lostpoets' },
    //   { slug: 'toyboogers' },
    //   { slug: 'creature-world-collection' },
    //   { slug: 'bored-ape-chemistry-club' },
    //   { slug: 'the-doge-pound' },
    //   { slug: 'lazy-lions' },
    //   { slug: 'bvgarden' },
    //   { slug: 'evosnails-nft' },
    //   { slug: 'braindrops-1' },
    //   { slug: 'galacticapes' },
    //   { slug: 'neo-tokyo-identities' },
    //   { slug: 'world-of-women-nft' },
    //   { slug: 'veefriends' },
    //   { slug: 'crypto-unicorns-market' },
    //   { slug: 'womenandweapons' },
    //   { slug: 'fidenza-by-tyler-hobbs' },
    //   { slug: 'deadfellaz' },
    //   { slug: 'sodativity' },
    //   { slug: 'rumble-kong-league' },
    //   { slug: 'legend-maps-founder' },
    //   { slug: 'cooldogsofficial' },
    //   { slug: 'angry-ape-army' },
    //   { slug: 'emblem-vault' },
    //   { slug: 'lil-baby-ape-club' },
    //   { slug: 'art-blocks-factory' },
    //   { slug: 'the-pixels-inc' },
    //   { slug: 'bears-deluxe' },
    //   { slug: 'punks-comic' },
    //   { slug: 'nonfungiblefungimintpass' },
    //   { slug: 'pudgypenguins' },
    //   { slug: 'supducks' },
    //   { slug: 'anonymice' },
    //   { slug: 'ninja-squad-official' },
    //   { slug: 'somnium-space' },
    //   { slug: 'neo-tokyo-part-2-vault-cards' },
    //   { slug: 'bearxlabs' },
    //   { slug: 'fluf-world' },
    //   { slug: 'mirandus' },
    //   { slug: 'cyberkongz-vx' },
    //   { slug: 'ether-orcs' },
    //   { slug: 'curiocardswrapper' },
    //   { slug: 'spooky-boys-country-club-by-holyghost' },
    //   { slug: 'kaiju-kingz' },
    //   { slug: 'chromie-squiggle-by-snowfro' },
    //   { slug: 'peaceful-groupies' },
    //   { slug: 'mekaverse' },
    //   { slug: 'the-meta-key' },
    //   { slug: 'zed-run-official' },
    //   { slug: 'monkeybet' },
    //   { slug: 'zunks' },
    //   { slug: 'golden-token-incomplete-control' },
    //   { slug: 'project-draca-genesis' },
    //   { slug: 'bossbeauties' },
    //   { slug: 'corruption-s' },
    //   { slug: 'theshiboshis' },
    //   { slug: 'urbit-id' },
    //   { slug: 'bricktopians-by-law-degree' },
    //   { slug: 'autology-by-steganon' },
    //   { slug: 'metathugs' },
    //   { slug: 'mutantcats' },
    //   { slug: 'loomlock' },
    //   { slug: 'edifice-by-ben-kovach' },
    //   { slug: 'fewocious-x-rtfkt' },
    //   { slug: 'theredvillagebloodportal' },
    //   { slug: 'ens' },
    //   { slug: 'town-star' },
    //   { slug: 'wolf-game-farmer' },
    //   { slug: 'billionaireclubnft' },
    //   { slug: 'divineanarchy' },
    //   { slug: 'cryptovoxels' },
    //   { slug: 'cosmiclabs' },
    //   { slug: 'theredvillagechampions' },
    //   { slug: 'bubblegumkids' },
    //   { slug: 'non-fungible-fungi-v2' },
    //   { slug: 'thehumanoids' },
    //   { slug: 'monacoplanetyacht' },
    //   { slug: 'sidus-nft-heroes' },
    //   { slug: 'dopey-ducklings' },
    //   { slug: 'the-sandbox-assets' },
    //   { slug: 'derace-horses' },
    //   { slug: 'jungle-freaks-by-trosley' },
    //   { slug: 'wilderworld' },
    //   { slug: 'superfarm' },
    //   { slug: 'thorguards' },
    //   { slug: 'monkeverse' },
    //   { slug: '0n1-force' },
    //   { slug: 'metahero-generative' },
    //   { slug: 'dehorizonfun' },
    //   { slug: 'astroheadsnft' },
    //   { slug: 'avariksagauniverse' },
    //   { slug: 'metatravelers' },
    //   { slug: 'niftydegen' },
    //   { slug: 'lootproject' },
    //   { slug: 'fullbodyapeclub' },
    //   { slug: 'neo-tokyo-part-4-land-deeds' },
    //   { slug: 'onchainmonkey' },
    //   { slug: 'deafbeef' },
    //   { slug: 'matrixworld-landvoucher' },
    //   { slug: 'desperate-ape-wives' },
    //   { slug: 'strong-ape-club' },
    //   { slug: 'adam-bomb-squad' },
    //   { slug: 'lil-mutant-apes-club' },
    //   { slug: 'fragments-of-an-infinite-field-by-monica-rizzolli' },
    //   { slug: 'cryptodickbutts-s3' },
    //   { slug: 'angryapesunited' },
    //   { slug: 'the-wild-bunch-nft' },
    //   { slug: 'robotos-official' },
    //   { slug: 'asemica-by-emily-edelman-dima-ofman-andrew-badr' },
    //   { slug: 'neo-tokyo-part-3-item-caches' },
    //   { slug: 'letters-by-vinnie-hager' },
    //   { slug: 'timelessnfts' },
    //   { slug: 'rtfkt-x-jeffstaple' },
    //   { slug: 'mines-of-dalarnia-mining-apes-collection' },
    //   { slug: 'bit-monsters-v2' },
    //   { slug: 'superrare' },
    //   { slug: 'qxj0iejsb2nrcybqdxjnyxrvcnk' },
    //   { slug: 'starlink-pixelnauts' },
    //   { slug: 'asm-aifa-genesis' },
    //   { slug: 'forgottenruneswizardscult' },
    //   { slug: 'theenigma' },
    //   { slug: 'ethermonkeys' },
    //   { slug: 'the-fungible-by-pak' },
    //   { slug: 'ben-baller-blockchains' },
    //   { slug: 'guttercatgang' },
    //   { slug: 'pegz' },
    //   { slug: 'rtfkt-bonus-items' },
    //   { slug: 'doodlelabs' },
    //   { slug: 'frontiergame' },
    //   { slug: 'lilbabypunks' },
    //   { slug: 'impact-theory-founders-key' },
    //   { slug: 'boonjiproject' },
    //   { slug: 'embersword-land' },
    //   { slug: 'retirementclubnft' },
    //   { slug: 'playboyrabbitars' },
    //   { slug: 'spaceapes' },
    //   { slug: 'og-crystals' },
    //   { slug: 'rarible' },
    //   { slug: 'billionairezombiesclub' },
    //   { slug: 'planetdaos' },
    //   { slug: 'metasaurs-nft' },
    //   { slug: 'bayc-honorary-members' },
    //   { slug: 'sneaky-vampire-syndicate' },
    //   { slug: 'dogesoundclub-mates' },
    //   { slug: 'koala-intelligence-agency' },
    //   { slug: 'squiddao' },
    //   { slug: 'cyber-factory-2' },
    //   { slug: 'gutterdogs' },
    //   { slug: 'inft-personality-pod-alethea-ai' },
    //   { slug: 'ape-gang' },
    //   { slug: 'acclimatedmooncats' },
    //   { slug: 'ape-in-productions' },
    //   { slug: 'fat-ape-club-1' },
    //   { slug: 'spacebugs' },
    //   { slug: 'alpacadabraz' },
    //   { slug: 'doge-pound-puppies-real' },
    //   { slug: 'mastersha' },
    //   { slug: 'foxfam' },
    //   { slug: 'more-loot' },
    //   { slug: 'furballs-com-official' },
    //   { slug: 'headdao' },
    //   { slug: 'ghxsts' },
    //   { slug: 'mumbotworld' },
    //   { slug: 'plugpass' },
    //   { slug: 'thecurrency' },
    //   { slug: 'bored-mummy-waking-up' },
    //   { slug: 'timepieces-woty' },
    //   { slug: 'galaxy-fight-club' },
    //   { slug: 'galacticmonkes' },
    //   { slug: 'cdao' },
    //   { slug: 'vortex-spectra-art' },
    //   { slug: 'cryptocities' },
    //   { slug: 'metatravelers-genesis-stone' },
    //   { slug: 'citylights-v2' },
    //   { slug: 'the-real-goat-society' },
    //   { slug: 'blootofficial' },
    //   { slug: 'rtfkt-creators' },
    //   { slug: 'stoner-cats-official' },
    //   { slug: 'elliotrades' },
    //   { slug: 'the-wanderers' },
    //   { slug: 'quantum-curated' },
    //   { slug: 'pxin-gxng' },
    //   { slug: 'sidus-nft-heroes-galaxy-modificators' },
    //   { slug: 'wicked-monsters' },
    //   { slug: 'partydegenerates' },
    //   { slug: 'sipherianflash' },
    //   { slug: 'strongblock-nfts' },
    //   { slug: 'slimhoods' },
    //   { slug: 'metaverse-hq' },
    //   { slug: '888innercircle' },
    //   { slug: 'embersword-badge' },
    //   { slug: 'g-evols' },
    //   { slug: 'league-of-kingdoms' },
    //   { slug: 'cryptocards-collection' },
    //   { slug: '10ktf-stockroom' },
    //   { slug: 'dava-humanoids' },
    //   { slug: 'huxley-comics' },
    //   { slug: 'nifty-island-legendary-palms' },
    //   { slug: 'apeharmonymonsterclub' },
    //   { slug: 'stacked-monkeys' },
    //   { slug: 'anonymicebreeding' },
    //   { slug: 'roaringleaders' },
    //   { slug: 'fvck-crystal' },
    //   { slug: 'toddlerpillars' },
    //   { slug: 'the-forgotten-cult' },
    //   { slug: 'blueworld-v1' },
    //   { slug: 'superlativesecretsociety' },
    //   { slug: 'mutant-gorillas-' },
    //   { slug: 'meridian-by-matt-deslauriers' },
    //   { slug: 'derace-jockey-club' },
    //   { slug: 'etherbananasv1' },
    //   { slug: 'thecryptodads' },
    //   { slug: 'hashmasks' },
    //   { slug: 'chicken-derby' },
    //   { slug: 'bitcoinbillionaires' },
    //   { slug: 'theyakuzacatssociety' },
    //   { slug: 'sipheriansurge' },
    //   { slug: 'chinese-zodiac-metaverse-by-yassartlabs' },
    //   { slug: 'alphaverse-beat-alphaverse-concerts' },
    //   { slug: '24px' },
    //   { slug: 'galaxyeggs9999' },
    //   { slug: 'voxies' },
    //   { slug: 'winterbears' },
    //   { slug: 'baboonbet' },
    //   { slug: 'thecheekylionclub' },
    //   { slug: 'bitcolors-io' },
    //   { slug: 'frammenti-by-stefano-contiero' },
    //   { slug: 'billionaire-coyote-cartel' },
    //   { slug: 'gfcgenesiskey' },
    //   { slug: 'hapebeastgenesis' },
    //   { slug: 'twoplustwogenesis' },
    //   { slug: 'dope-v4' },
    //   { slug: 'merry-modz' },
    //   { slug: 'cheyuwuxnobody' },
    //   { slug: 'grailers' },
    //   { slug: 'jakesworld' },
    //   { slug: 'wall-street-bulls' },
    //   { slug: 'phase-by-loren-bednar' },
    //   { slug: 'fiscusdao-collection' },
    //   { slug: 'guppygang' },
    //   { slug: 'head5-dm5' },
    //   { slug: 'kaiju-failed-experiments' },
    //   { slug: 'decentral-games-ice' },
    //   { slug: 'digination-digiavatar' },
    //   { slug: 'gutterpigeons' },
    //   { slug: 'cat-town-punks' },
    //   { slug: 'rtfkt-punk-project-gen1' },
    //   { slug: 'wonky-stonks' },
    //   { slug: 'chibi-galaxy' },
    //   { slug: 'originsnft' },
    //   { slug: 'beeple-everydays' },
    //   { slug: 'dapperdinosnft' },
    //   { slug: 'revv-motorsport-inventory' },
    //   { slug: 'makersplace' },
    //   { slug: 'chubbiverse-frens' },
    //   { slug: 'apostles-genesis' },
    //   { slug: 'jenkins-the-valet' },
    //   { slug: 'cuteweirdcreepy' },
    //   { slug: 'infinityveil' },
    //   { slug: 'capsulehouse' },
    //   { slug: 'byopills' },
    //   { slug: 'chameleon-collective' },
    //   { slug: 'unigrids-by-zeblocks' },
    //   { slug: 'kohi-kintsugi' },
    //   { slug: 'deadheads' },
    //   { slug: 'theplutoalliance' },
    //   { slug: 'cryptocannabisclub' },
    //   { slug: 'spacepepes' },
    //   { slug: 'fiscusdao-nft-collections' },
    //   { slug: 'archetype-by-kjetil-golid' },
    //   { slug: 'golden-token-berlin' },
    //   { slug: 'mutant-garden-seeder' },
    //   { slug: 'iconsnftcollection' },
    //   { slug: 'vempire-the-founding-soldiers' },
    //   { slug: 'reflection-by-jeff-davis' },
    //   { slug: 'rtfkt-capsule-space-drip' },
    //   { slug: 'pet-simulator-x' },
    //   { slug: 'mona-spaces' },
    //   { slug: 'sappy-seals' },
    //   { slug: 'fastfoodlilbabyapesclub' },
    //   { slug: 'wicked-ape-bone-club' },
    //   { slug: 'geometric-sa3sfre' },
    //   { slug: 'bluworldnft' },
    //   { slug: 'unity-cards' },
    //   { slug: 'worst-case-by-3lau-royal' },
    //   { slug: 'gutterrats' },
    //   { slug: 'warriors-of-aradena' },
    //   { slug: 'lucky-elephant-club' },
    //   { slug: 'blitmap' },
    //   { slug: 'scholarz' },
    //   { slug: 'gmpunks' },
    //   { slug: 'nftboxes' },
    //   { slug: 'fluf-world-thingies' },
    //   { slug: 'nosolounjpg' },
    //   { slug: 'eponym' },
    //   { slug: 'bigtime-founders' },
    //   { slug: 'fanggangnft' },
    //   { slug: 'hashflow-official' },
    //   { slug: 'floki-inu-diamond-hands-ruby-tier' },
    //   { slug: 'space-capsules' },
    //   { slug: 'nyanaoki' },
    //   { slug: 'boredcatclub' },
    //   { slug: 'cryptocubes' },
    //   { slug: 'cryptonauts-by-blockzero-labs' },
    //   { slug: 'skullx' },
    //   { slug: 'bitgans' },
    //   { slug: 'theimmortalz' },
    //   { slug: 'gmworld' },
    //   { slug: 'solvency-by-ezra-miller' },
    //   { slug: '6529-gradient' },
    //   { slug: 'cryptoraidersmusic' },
    //   { slug: 'ethereum-towers' },
    //   { slug: 'revenants-by-alethea-ai' },
    //   { slug: 'spider-tanks' },
    //   { slug: 'rareghostclub' },
    //   { slug: 'eddaswap' },
    //   { slug: 'joyworld-s2' },
    //   { slug: 'danny-art' },
    //   { slug: 'nimbuds-by-bryan-brinkman' },
    //   { slug: 'thegoobers' },
    //   { slug: 'marscatsvoyage' },
    //   { slug: 'the-title-by-pak' },
    //   { slug: 'noadz' },
    //   { slug: 'habbo-avatars' },
    //   { slug: 'krafterspace' },
    //   { slug: 'cryptokitties' },
    //   { slug: 'nicefunzombies' },
    //   { slug: 'wack-by-camille-chiang' },
    //   { slug: 'kgds' },
    //   { slug: 'golden-token-crypto-new-yorkers' },
    //   { slug: 'xcopy' },
    //   { slug: '10ktf' },
    //   { slug: 'pegaxypega-1' },
    //   { slug: 'crazycamels' },
    //   { slug: 'octopuos' },
    //   { slug: 'farsiteship' },
    //   { slug: 'heartnftproject' },
    //   { slug: 'plebpunks' },
    //   { slug: 'memebank' },
    //   { slug: 'boo-bears' },
    //   { slug: 'ninjalerts-lifetime-license' },
    //   { slug: 'themodz' },
    //   { slug: 'treasures-club-masters' },
    //   { slug: 'singularity-by-hideki-tsukamoto' },
    //   { slug: 'nftrees' },
    //   { slug: '0xmons-xyz' },
    //   { slug: 'animocabrandslaunchpad' },
    //   { slug: 'bezogis' },
    //   { slug: 'cryptodickbutts' },
    //   { slug: 'knights-of-degen-official' },
    //   { slug: 'polarbearsnft' },
    //   { slug: 'stackedtoadz' },
    //   { slug: 'fomoverse' },
    //   { slug: 'cryptohoots-steampunk-parliament' },
    //   { slug: 'bond-bears' },
    //   { slug: 'royalsocietyofplayers' },
    //   { slug: 'riot-racers-cars' },
    //   { slug: 'jadu-jetpack' },
    //   { slug: 'metakrew' },
    //   { slug: 'bored-hasbi' },
    //   { slug: 'animetas' },
    //   { slug: 'cupcatsofficial' },
    //   { slug: 'crypto-duckies' },
    //   { slug: 'woodies-mint-passport' },
    //   { slug: 'skulptuur-by-piter-pasma' },
    //   { slug: 'hackatao' },
    //   { slug: 'chill-frogs' },
    //   { slug: 'bamc-48h-capital' },
    //   { slug: 'joseonnft' },
    //   { slug: 'nfh' },
    //   { slug: 'rtfkt-capsule-space-drip-1-2' },
    //   { slug: 'the-140-collection' },
    //   { slug: 'genesis-syncronauts' },
    //   { slug: 'cryptozombieznft' },
    //   { slug: 'fomo-dog-club' },
    //   { slug: 'daytrip-by-defaced-and-misan-harriman' },
    //   { slug: 'g4n9' },
    //   { slug: 'magic-mushroom-clubhouse' },
    //   { slug: 'namewee4896-collection' },
    //   { slug: 'cmykatz-nfts' },
    //   { slug: 'gm-9hvjv9oeqc' },
    //   { slug: 'fusionape' },
    //   { slug: 'luxnoctis' },
    //   { slug: 'madrabbitsriotclub' },
    //   { slug: 'firestartermetaversechampion' },
    //   { slug: 'topdogbeachclub' },
    //   { slug: 'nyan-cat-official' },
    //   { slug: 'beeple-5000' },
    //   { slug: 'mutant-punks-city' },
    //   { slug: 'blockchainminersclubofficial' },
    //   { slug: 'leapn-founders-deed-world' },
    //   { slug: 'gameofblocks' },
    //   { slug: 'sympathyforthedevils' },
    //   { slug: 'forgottensouls' },
    //   { slug: 'dystopunks' },
    //   { slug: 'maisondegoat' },
    //   { slug: 'transponders' },
    //   { slug: 'pepelangelo' },
    //   { slug: 'catc' },
    //   { slug: 'cryptorastas-collection' },
    //   { slug: 'bofadeeznuts' },
    //   { slug: 'theninjahideout' },
    //   { slug: 'cryptopixelpepe' },
    //   { slug: 'crypto-raiders-characters' },
    //   { slug: 'the-crypto-chicks' },
    //   { slug: 'vegas-city-land-lease' },
    //   { slug: 'toolsofrockvip' },
    //   { slug: 'admixsomnium' },
    //   { slug: 'art-carpet-bombing' },
    //   { slug: 'waveblocks' },
    //   { slug: 'pudgypresents' },
    //   { slug: 'tom-sachs-rockets' },
    //   { slug: 'theclub721' },
    //   { slug: 'misfits-collection' },
    //   { slug: 'bongbears' },
    //   { slug: 'babylon-prophets' },
    //   { slug: 'robopets' },
    //   { slug: 'the-creation' },
    //   { slug: 'scribbled-boundaries-by-william-tan' },
    //   { slug: 'paladin-pandas' },
    //   { slug: 'fameladysquad' },
    //   { slug: 'llamapass' },
    //   { slug: 'nfteams-club' },
    //   { slug: 'bzc-skeleton-keys' },
    //   { slug: 'inft-personality-pod-sale' },
    //   { slug: 'official-surreals' },
    //   { slug: '1989-sisters-sale' },
    //   { slug: 'dirtydogsnft' },
    //   { slug: 'gen-dot-art' },
    //   { slug: 'fluf-world-scenes-and-sounds' },
    //   { slug: 'lobsterdao' },
    //   { slug: 'chubbicorns' },
    //   { slug: 'mutant-ape-polygon-club' },
    //   { slug: 'mushrohms' },
    //   { slug: 'dogs-of-elon' },
    //   { slug: 'illuvium' },
    //   { slug: 'loopy-donuts' },
    //   { slug: 'ether-cards-founder' },
    //   { slug: 'thewickedcraniums' },
    //   { slug: 'construction-token-by-jeff-davis' },
    //   { slug: 'century-by-casey-reas' },
    //   { slug: 'vogu' },
    //   { slug: 'metalheads' },
    //   { slug: 'marine-marauderz-2d' },
    //   { slug: 'flokitars' },
    //   { slug: 'iceworldnft' },
    //   { slug: 'heart-cryptopop' },
    //   { slug: 'ryzensolutions' },
    //   { slug: 'women-of-aradena' },
    //   { slug: 'obscure-alteration-hollowsun' },
    //   { slug: 'treasure-mystery-box-v2' },
    //   { slug: 'freshdrops' },
    //   { slug: 'space-punks-club' },
    //   { slug: 'goonsofbalatroon' },
    //   { slug: 'ygg-sword-and-shield' },
    //   { slug: 'rumble-kong-league-sneakers' },
    //   { slug: 'animalspunks-v2' },
    //   { slug: 'ununicornsofficial' },
    //   { slug: 'genzee' },
    //   { slug: 'qorpo-traderacemanager' },
    //   { slug: 'rollbots' },
    //   { slug: 'mobskeys' },
    //   { slug: 'bored-ape-ladies' },
    //   { slug: 'floki-inu-diamond-hands-diamond-tier' },
    //   { slug: 'onlypunksnft' },
    //   { slug: 'goldenfuture' },
    //   { slug: 'mongz' },
    //   { slug: 'the-loyalists-collection' },
    //   { slug: 'sunsignals' },
    //   { slug: 'avastar' },
    //   { slug: 'the-nft-guild' },
    //   { slug: 'hor1zon-troopers' },
    //   { slug: 'octohedz-reloaded' },
    //   { slug: 'great-ape-society' },
    //   { slug: 'cryptofoxes-origin-steak' },
    //   { slug: 'aku-chapters' },
    //   { slug: 'golden-token-reflections' },
    //   { slug: 'klayrock' },
    //   { slug: 'nessgraphics' },
    //   { slug: 'angryboarsnft' },
    //   { slug: 'secretsocietyofwhales' },
    //   { slug: 'urbananomalies' },
    //   { slug: 'nftsiblings' },
    //   { slug: 'dropspace-mint-tickets' },
    //   { slug: 'purrnelopes-country-club' },
    //   { slug: 'poap-v2' },
    //   { slug: 'n-project' },
    //   { slug: 'unidentified-contract-p2bmupqct0' },
    //   { slug: 'brain-vomit-collection' },
    //   { slug: 'neko-official' },
    //   { slug: 'bad-bunnies-nft' },
    //   { slug: 'mojopasses' },
    //   { slug: 'footium-football-club-v2' },
    //   { slug: 'dos-punks' },
    //   { slug: 'uwucrew' },
    //   { slug: 'skulliesgmi' },
    //   { slug: 'cryptoarte' },
    //   { slug: 'gallery-membership-cards' },
    //   { slug: 'godsofrock' },
    //   { slug: 'chumbi-valley-founders-collection' },
    //   { slug: 'rtfkteastereggs' },
    //   { slug: 'bearache' },
    //   { slug: 'vogue-singapore-nft-collection' },
    //   { slug: 'theslothtribe-com' },
    //   { slug: 'gorillanemesis' },
    //   { slug: 'obitsofficial' },
    //   { slug: 'ghostbusters-vignettes' },
    //   { slug: 'blockchainadventuresofbellathebluebot' },
    //   { slug: 'joe-tamponi-survivors' },
    //   { slug: 'eponym-gen2' },
    //   { slug: 'eggbois' },
    //   { slug: 'the-sleepless-mine-society-by-sleepless-workshop' },
    //   { slug: 'politicalpunk' },
    //   { slug: 'superchief-gallery-nifty' },
    //   { slug: 'polka-city-asset' },
    //   { slug: 'dogesoundclub-emates' },
    //   { slug: 'pigments-by-darien-brito' },
    //   { slug: 'scrazyone' },
    //   { slug: 'ultra-blades' },
    //   { slug: 'sneaky-bat-syndicate' },
    //   { slug: 'z-huge' },
    //   { slug: 'miu-the-painter' },
    //   { slug: 'transparent-artist' },
    //   { slug: 'cyber-curated' },
    //   { slug: 'stakedaohq' },
    //   { slug: 'the-colors-dot-art' },
    //   { slug: 'chainguardians' },
    //   { slug: 'cases-by-kate' },
    //   { slug: 'noun-gan' },
    //   { slug: 'redemption-tokens-for-brendan-murphy-physical-art' },
    //   { slug: 'ghostbusters' },
    //   { slug: 'wolf-games-landnft' },
    //   { slug: 'radioactive-punks' },
    //   { slug: 'momentible' },
    //   { slug: 'cryptoedition' },
    //   { slug: 'the-moon-boyz' },
    //   { slug: 'gauntlets' },
    //   { slug: 'primate-social-society-official' },
    //   { slug: 'artifex' },
    //   { slug: 'timepieces-build-a-better-future-genesis-drop' },
    //   { slug: 'zombiemonkeys' },
    //   { slug: 'poligoonz' },
    //   { slug: 'lightcultcryptoclub' },
    //   { slug: 'trossets-by-anna-carreras' },
    //   { slug: 'gamedisease' },
    //   { slug: 'rinascita-by-stefano-contiero' },
    //   { slug: 'kolectiv' },
    //   { slug: 'cuna-white-witch' },
    //   { slug: 'genesisadventurer' },
    //   { slug: 'visionscollection' },
    //   { slug: 'tiny-kingdoms' },
    //   { slug: 'lbo' },
    //   { slug: 'heroes-of-evermore' },
    //   { slug: 'nanoblits' },
    //   { slug: 'opensea-gems-v2' },
    //   { slug: 'derace-ticket' },
    //   { slug: 'chibi-genesis' },
    //   { slug: 'pop-wonder-on-display' },
    //   { slug: 'hoppersnft' },
    //   { slug: 'moribykevbro' },
    //   { slug: 'arpeggi-genesis-studio-pass' },
    //   { slug: 'ethernity-master' },
    //   { slug: 'spiral-frequencies' },
    //   { slug: 'street-melts' },
    //   { slug: 'zapper-season-2' },
    //   { slug: 'madebymegan' },
    //   { slug: 'pills' },
    //   { slug: 'bullsontheblock-evo' },
    //   { slug: 'boredgutterapes' },
    //   { slug: 'skullx-aeons' },
    //   { slug: 'smircs' },
    //   { slug: 'avid-lines' },
    //   { slug: 'apparitions-by-aaron-penne' },
    //   { slug: 'polka-city-3d-asset' },
    //   { slug: 'extradimensionalbeings' },
    //   { slug: 'kingfrogs' },
    //   { slug: 'wes-henry-art' },
    //   { slug: 'bmgfs-collabs' },
    //   { slug: 'beatboxes-by-zeblocks' },
    //   { slug: 'explosionofcolor' },
    //   { slug: 'gooncats' },
    //   { slug: 'cryptoweebs' },
    //   { slug: 'byokey' },
    //   { slug: 'thedudes' },
    //   { slug: 'the-blocks-of-art-by-shvembldr' },
    //   { slug: 'robotos-originals' },
    //   { slug: 'watercolor-dreams-by-numbersinmotion' },
    //   { slug: 'mutantkongz' },
    //   { slug: 'arcadenft' },
    //   { slug: 'pumpametti' },
    //   { slug: 'thedragonversegame' },
    //   { slug: 'jpegs-angels' },
    //   { slug: 'thealienboy' },
    //   { slug: 'bored-ape-kids-club' },
    //   { slug: 'aetherian-deed' },
    //   { slug: 'klayrabbit' },
    //   { slug: 'octohedz' },
    //   { slug: 'ape-dao-remix' },
    //   { slug: 'moonray-game-presale-pass' },
    //   { slug: 'eternal-klay' },
    //   { slug: 'tmrwlandnft' },
    //   { slug: 'cryptopervs' },
    //   { slug: 'the-sevens-official' },
    //   { slug: 'ready-player-cat-nft' },
    //   { slug: 'corite-x-emery-kelly-emotions-collection' },
    //   { slug: 'genesis-immutable-rex' },
    //   { slug: 'graycraft-2' },
    //   { slug: 'satoshibles' },
    //   { slug: 'polygonpunks' },
    //   { slug: 'bullsontheblock' },
    //   { slug: 'lonelyalienspaceclub' },
    //   { slug: 'ex-nft-5iobgpgyii' },
    //   { slug: 'algobots-by-stina-jones' },
    //   { slug: 'citizens-of-bulliever-island' },
    //   { slug: 'ghostbusters-traps' },
    //   { slug: 'bastard-gan-punks-v2' },
    //   { slug: 'bored-ape-mining-club' },
    //   { slug: 'affe-mit-waffe' },
    //   { slug: 'visitors-of-imma-degen' },
    //   { slug: 'generation-habibi' },
    //   { slug: 'cryptoflyz' },
    //   { slug: 'cyberpunk-apes' },
    //   { slug: 'cryptoys-classics' },
    //   { slug: 'apocalypse-art-meeings' },
    //   { slug: 'wlcc' },
    //   { slug: 'sadgirlsgalaxy' },
    //   { slug: 'long-neckie-ladies' },
    //   { slug: 'genetic-chain-founders-pass' },
    //   { slug: 'diamond-hands-ltd' },
    //   { slug: 'chibi-apes' },
    //   { slug: 'riot-racers-racetrack-land' },
    //   { slug: 'slimesunday' },
    //   { slug: 'theradiantsocietynft' },
    //   { slug: 'baeige' },
    //   { slug: 'narcissus-by-pak' },
    //   { slug: 'rebelbots' },
    //   { slug: 'eternal-fragments' },
    //   { slug: 'bored-mummy-baby-waking-up' },
    //   { slug: 'pendle-finance' },
    //   { slug: 'eastip' },
    //   { slug: 'substrata-parcel' },
    //   { slug: 'monkey-society-tms' },
    //   { slug: 'mushrohms-descendants' },
    //   { slug: 'angrymeerkatsnft' },
    //   { slug: 'astro-frens' },
    //   { slug: 'sabet' },
    //   { slug: 'genesis-mana' },
    //   { slug: 'sheikhs' },
    //   { slug: 'thecryptoonz' },
    //   { slug: 'jakes-world-editions' },
    //   { slug: 'pandaparadise' },
    //   { slug: 'cyber-hornets-colony-club' },
    //   { slug: 'punkscapes' },
    //   { slug: 'axolittles' },
    //   { slug: 'crazyskullznft' },
    //   { slug: 'infinites-ai' },
    //   { slug: 'shabangrs' },
    //   { slug: 'machinietomigrate' },
    //   { slug: 'thedreamers' },
    //   { slug: 'hakugarden' },
    //   { slug: 'wicked-hound-bone-club' },
    //   { slug: 'tropical-turtles' },
    //   { slug: 'algorhythms-by-han-x-nicolas-daniel' },
    //   { slug: 'jstieditions' },
    //   { slug: 'thecryptomoms' },
    //   { slug: 'rude-boys' },
    //   { slug: 'lumpsworld' },
    //   { slug: 'niftydragons' },
    //   { slug: 'fast-food-punks' },
    //   { slug: '720-minutes-by-alexis-andre' },
    //   { slug: 'encode-founder-nfts' },
    //   { slug: 'elementals-by-michael-connolly' },
    //   { slug: 'forestmoments' },
    //   { slug: 'thevisitors' },
    //   { slug: 'dotdotdots' },
    //   { slug: 'theclaylings' },
    //   { slug: 'passport-for-spark-era' },
    //   { slug: 'exclusible-alpha' },
    //   { slug: 'crypto-pills-by-micha-klein' },
    //   { slug: 'boredpunkyachtclub' },
    //   { slug: 'cryptowhips' },
    //   { slug: 'apesofspace-official' },
    //   { slug: 'alien-insects-by-shvembldr' },
    //   { slug: 'plasma-bears' },
    //   { slug: 'toyfrens' },
    //   { slug: 'the-boi' },
    //   { slug: 'monsterbuds' },
    //   { slug: 'samot-club' },
    //   { slug: 'stock-haku1' },
    //   { slug: 'rainicorn-evolved' },
    //   { slug: 'meme-ltd' },
    //   { slug: 'mutant-baby-ape-club-v2' },
    //   { slug: 'cosmiccowgirls-nft' },
    //   { slug: 'bossllamas' },
    //   { slug: 'alien-genesys' },
    //   { slug: 'mad-dog-jones' },
    //   { slug: 'machinie' },
    //   { slug: 'bubble-blobby-by-jason-ting' },
    //   { slug: 'landvault' },
    //   { slug: 'cryptofoxes-v2' },
    //   { slug: 'mycryptoheroes' },
    //   { slug: 'far-a-head' },
    //   { slug: 'legends-of-the-metaverse' },
    //   { slug: 'rarebunniclub' },
    //   { slug: 'cryptomutts-official' },
    //   { slug: 'stimaes' },
    //   { slug: 'floor-app' },
    //   { slug: 'daopunksnft' },
    //   { slug: 'gmtoadz' },
    //   { slug: 'asa-culture' },
    //   { slug: 'ddkc' },
    //   { slug: 'pixelmap' },
    //   { slug: 'slime-kingdom-defense' },
    //   { slug: 'xcopycats-1' },
    //   { slug: 'cryptofoxes-origin' },
    //   { slug: 'themonalana' },
    //   { slug: 'satoshis-legions-presale-tokens' },
    //   { slug: 'arcus-rik' },
    //   { slug: 'the-archives-by-jake' },
    //   { slug: 'riot-racers-billboard-land' },
    //   { slug: 'twobitbears' },
    //   { slug: 'apes3d' },
    //   { slug: 'hashes' },
    //   { slug: 'metatokyo-pass-gen-1-0' },
    //   { slug: 'retirementclub' },
    //   { slug: 'incognito-nft' },
    //   { slug: 'diamondcryptodunks' },
    //   { slug: 'glitch-crystal-monsters-by-alida-sun' },
    //   { slug: 'the-avatar-project-official' },
    //   { slug: 'forestmusings' },
    //   { slug: 'cryptobeasts-official' },
    //   { slug: 'absurdarboretump2' },
    //   { slug: 'the-underground-sistine-chapel-by-pboy' },
    //   { slug: 'aivatarnft' },
    //   { slug: 'fnd' },
    //   { slug: 'bitznft' },
    //   { slug: 'seasons-by-dirty-robot' },
    //   { slug: 'riot-racers-mechanic-shops' },
    //   { slug: 'genetic-chain-geneticists-pass' },
    //   { slug: 'showdeer' },
    //   { slug: 'gazellio-spatial-exhibition' },
    //   { slug: 'baby-ape-boat-club' },
    //   { slug: 'bccg' },
    //   { slug: 'cyber-cities-by-pxlq' },
    //   { slug: 'metascraper-cadet' },
    //   { slug: 'pogpunks-nft' },
    //   { slug: 'starlink-living-module' },
    //   { slug: 'cryptopainter' },
    //   { slug: 'brain-vomits-digital-world' },
    //   { slug: 'borpacasso' },
    //   { slug: 'fortune-media' },
    //   { slug: 'crypto-packaged-goods' },
    //   { slug: 'alphamint' },
    //   { slug: 'untitled-collection-16665069' },
    //   { slug: 'ksoids' },
    //   { slug: 'aether' },
    //   { slug: 'friendly-abstractions-by-steganon' },
    //   { slug: 'synapses-by-chaosconstruct' },
    //   { slug: 'realms-of-ether-1' },
    //   { slug: 'skvllpvnkz-hideout' },
    //   { slug: 'chibidinos' },
    //   { slug: 'zapper-fi' },
    //   { slug: 'geometricminimalart' },
    //   { slug: 'genx-by-hok' },
    //   { slug: 'blockbots-by-indorse' },
    //   { slug: 'filaments-art' },
    //   { slug: 'deeldigitaldestinations' },
    //   { slug: 'return-by-aaron-penne' },
    //   { slug: 'rings-genesis-by-nick-kuder' },
    //   { slug: 'hall-of-fame-goat-lodge' },
    //   { slug: 'cyberbabies' },
    //   { slug: 'influenceth-asteroids' },
    //   { slug: 'nonfungiblefungigenesis' },
    //   { slug: 'mad-ape-tournament' },
    //   { slug: 'the-blitnauts' },
    //   { slug: 'gods-unchained-collectibles' },
    //   { slug: 'the-dirtbags' },
    //   { slug: 'wrapped-strikers' },
    //   { slug: 'monsterpunkclub' },
    //   { slug: 'chainbunnies' },
    //   { slug: 'ghxsts-cxlture' },
    //   { slug: 'jf-legendary-vault' },
    //   { slug: 'fusion-by-hideki-tsukamoto' },
    //   { slug: 'crypto-hobos' },
    //   { slug: 'neon-district-season-one-item' },
    //   { slug: 'klaygiantbaby' },
    //   { slug: 'floki-inu-diamond-hands-bronze-tier' },
    //   { slug: 'zunkpets' },
    //   { slug: 'immortals-10k' },
    //   { slug: 'soccerdogeclub' },
    //   { slug: 'the-gans-collective-varieta' },
    //   { slug: 'cryptozoo-base-animal' },
    //   { slug: 'dreams-by-joshua-bagley' },
    //   { slug: 'deadshead' },
    //   { slug: 'cryptolanders' },
    //   { slug: 'impermanent-digital' },
    //   { slug: 'evolvingforest' },
    //   { slug: 'omnimorphs' },
    //   { slug: 'polkafantasy' },
    //   { slug: 'accords-by-masque-milano' },
    //   { slug: 'allstarfreaks' },
    //   { slug: 'pasqua-nft' },
    //   { slug: 'josie' },
    //   { slug: 'giraffe-tower' },
    //   { slug: 'crypto-geishas' },
    //   { slug: 'chic-cow-bullzz-collection' },
    //   { slug: 'the-mike-tyson-nft-collection-by-cory-van-lew' },
    //   { slug: 'bonsai-zenft' },
    //   { slug: 'whisbe' },
    //   { slug: 'starlink-nft' },
    //   { slug: 'known-origin' },
    //   { slug: 'trevorjonesart' },
    //   { slug: 'twobithoney' },
    //   { slug: 'guardians-of-the-metaverse' },
    //   { slug: 'klay-ape-club' },
    //   { slug: 'cypher-punk-nft' },
    //   { slug: 'dynamicslices' },
    //   { slug: 'degengang' },
    //   { slug: 'cryptozoo-co' },
    //   { slug: 'iam-v1' },
    //   { slug: 'frankmillersincity' },
    //   { slug: 'foreverlands-founder' },
    //   { slug: 'dual-soul' },
    //   { slug: 'cool-cats-collabs' },
    //   { slug: 'the-nemesis-companions-factory' },
    //   { slug: 'fatales' },
    //   { slug: 'tabs-by-daniel-crossan' },
    //   { slug: 'brushstrokes-by-0xculture' },
    //   { slug: 'saturazione-by-stefano-contiero' },
    //   { slug: 'influence-crew' },
    //   { slug: 'cyber-zombie-society' },
    //   { slug: 'lamelo-ball-collectibles' },
    //   { slug: 'hiddeninnoise' },
    //   { slug: 'disney-golden-moments-nft' },
    //   { slug: 'bscwin-bulls' },
    //   { slug: 'space-dinos-club' },
    //   { slug: 'llamadraws' },
    //   { slug: 'zed-racehorse-skin' },
    //   { slug: 'sadgirlsbar' },
    //   { slug: '50worldwonders' },
    //   { slug: 'connect-girl' },
    //   { slug: 'cxllabs' },
    //   { slug: 'animal-society' },
    //   { slug: 'mindds' },
    //   { slug: 'colonists' },
    //   { slug: '8thproject' },
    //   { slug: 'tgol-founder-sale' },
    //   { slug: 'eternalroyals' },
    //   { slug: 'madmandos' },
    //   { slug: 'psvc' },
    //   { slug: 'topcatbeachclub' },
    //   { slug: 'etholvants' },
    //   { slug: 'decentraboard' },
    //   { slug: 'ape-harbour-yachts' },
    //   { slug: 'toucan-gang' },
    //   { slug: 'polygon-spaces' },
    //   { slug: 'genesis-by-dca' },
    //   { slug: 'blockydoge' },
    //   { slug: 'untitled-collection-133898957' },
    //   { slug: 'thediamondhands' },
    //   { slug: 'luchadores-io' },
    //   { slug: 'rebelrabbits' },
    //   { slug: 'aerial-view-by-dalenz' },
    //   { slug: 'spaceboysnft' },
    //   { slug: 'letswalk' },
    //   { slug: 'dreamer-alpies' },
    //   { slug: 'sneakersinthemetaverse' },
    //   { slug: 'justinaversano-gabbagallery' },
    //   { slug: 'chrisgeeeditions' },
    //   { slug: 'creator-space' },
    //   { slug: 'floki-inu-diamond-hands-silver-tier' },
    //   { slug: 'icy-founders-club' },
    //   { slug: 'skygolpe-x-hackatao' },
    //   { slug: 'drp-lushsux' },
    //   { slug: 'goop-troop' },
    //   { slug: 'elonsspaceparty' },
    //   { slug: 'eccentricsnft' },
    //   { slug: 'untitled-collection-136008094' },
    //   { slug: 'mysterychests' },
    //   { slug: 'animal-kingdom-friends' },
    //   { slug: 'rhythm-by-jeff-davis' },
    //   { slug: 'weird-punks-collection' },
    //   { slug: 'shiny-magpies' },
    //   { slug: 'phototaxis-by-casey-reas' },
    //   { slug: 'wolfgame-mint' },
    //   { slug: 'genetic-chain-chain-gang-pass' },
    //   { slug: 'bezogi-pets' },
    //   { slug: 'untitled-collection-22306961' },
    //   { slug: 'non-fungible-tools-membership' },
    //   { slug: 'epic-zombots' },
    //   { slug: 'pudgyapesofficial' },
    //   { slug: 'thesingularity' },
    //   { slug: 'ht-cypher' },
    //   { slug: 'zerion-genesis-collection' },
    //   { slug: 'osiris-cosmic-kids' },
    //   { slug: 'register' },
    //   { slug: 'picassopunks' },
    //   { slug: 'astro-league' },
    //   { slug: 'exclusible-gold-alpha' },
    //   { slug: 'venturesryanhawthorne' },
    //   { slug: 'funkyshrooms' },
    //   { slug: 'lootprints' },
    //   { slug: 'mecha-chaotic' },
    //   { slug: 'weirdpandas' },
    //   { slug: 'spacemetao' },
    //   { slug: 'ethereans-official' },
    //   { slug: 'gas-mask-wars' },
    //   { slug: 'micki-rabbits' },
    //   { slug: 'color-study-by-jeff-davis' },
    //   { slug: 'klaytnmap' },
    //   { slug: 'wrapped-mooncatsrescue' },
    //   { slug: 'megacryptopolis' },
    //   { slug: 'genai-nft' },
    //   { slug: 'metahelmet' },
    //   { slug: 'brotchain' },
    //   { slug: 'freespirits-nft' },
    //   { slug: 'coti-autumn-nfts' },
    //   { slug: 'billionaire-nft-club' },
    //   { slug: 'goodmorningcafe' },
    //   { slug: 'rabbitorverse' },
    //   { slug: 'cryptopochi' },
    //   { slug: 'treasure-for-loot' },
    //   { slug: 'greg-overton' },
    //   { slug: 'cryptoblots-by-daim-aggott-honsch' },
    //   { slug: 'wickedapedegens' },
    //   { slug: 'meow-meow-cats' },
    //   { slug: 'jose-delbo' },
    //   { slug: 'screw-man-2' },
    //   { slug: 'cryptobots' },
    //   { slug: 'f-r-a-g-m-e-n-t-s' },
    //   { slug: 'degengineering' },
    //   { slug: 'based-fish-mafia' },
    //   { slug: 'boredapepixelparty' },
    //   { slug: 'fattarverse' },
    //   { slug: 'skulleternal' },
    //   { slug: 'babyhodla' },
    //   { slug: 'crypto-rich-album' },
    //   { slug: 'galaxy-kats-universe' },
    //   { slug: 'unusualwhalesnft' },
    //   { slug: 'cryptomanga-genesis' },
    //   { slug: 'theduds' },
    //   { slug: 'weirdwhales' },
    //   { slug: 'theprojecturs' },
    //   { slug: 'lil-baby-penguins' },
    //   { slug: 'karma-dao-1' },
    //   { slug: 'ignition-by-ge1doot' },
    //   { slug: 'thegatekeepers' },
    //   { slug: 'rebelsealsclubrsc' },
    //   { slug: 'unstackedtoadz' },
    //   { slug: 'nxtdropmint' },
    //   { slug: 'thefriendsandfamily' },
    //   { slug: 'futureproofvisions' },
    //   { slug: 'lgnd' },
    //   { slug: 'toolsofrock' },
    //   { slug: 'tie-dye-ninjas' },
    //   { slug: 'avenged-sevenfold-x-cam-rackam' },
    //   { slug: 'defaced-n-friends' },
    //   { slug: 'gangland-skulls' },
    //   { slug: 'bloktopianft' },
    //   { slug: 'clones-never-die-v2' },
    //   { slug: 'nifty-league-launch-comics' },
    //   { slug: 'just-bricks' },
    //   { slug: 'mutant-punks-nft' },
    //   { slug: 'wen-lambo-by-brain-vomit' },
    //   { slug: 'polkapets' },
    //   { slug: 'mesmerizer' },
    //   { slug: 'alap-the-lost-pioneers' },
    //   { slug: 'hogemanclub' },
    //   { slug: 'crayonboys' },
    //   { slug: 'ice-cream-shades' },
    //   { slug: 'wooshiworld' }
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('original_collections', null, {});
  }
};
