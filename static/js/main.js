function _fillTemplate(args) {
  const templateContent = (() => {
    if ("templateContent" in args) {
      return args.templateContent;
    } else {
      return document.getElementById(args.templateId).innerHTML;
    }
  })();

  // row_elem.content
  const row_temp = Handlebars.compile(templateContent);
  const row_text = row_temp(args.data);

  const tbody_elem = document.getElementById(args.dstId);
  tbody_elem.innerHTML += row_text;
}

function _makeHeader() {
  const content = `
    <section class="hero">
        <div class="hero-body">
            <div class="container is-max-desktop">
                <div class="columns is-centered">
                    <div class="column has-text-centered">
                        <h1 class="title is-2 publication-title">DyST: Towards Dynamic Neural Scene Representations on Real-World Videos</h1>
                        <p class="is-size-6 text-center">
                            <a target="_blank" rel="noopener noreferrer" href="https://al.is.mpg.de/person/mseitzer/">Maximilian Seitzer</a><sup>1</sup><sup>*</sup>  
                            <a target="_blank" rel="noopener noreferrer" href="https://www.sjoerdvansteenkiste.com//">Sjoerd van Steenkiste</a><sup>2</sup>  
                            <a target="_blank" rel="noopener noreferrer" href="https://tkipf.github.io/">Thomas Kipf</a><sup>3</sup>  
                            <a target="_blank" rel="noopener noreferrer" href="https://qwlouse.github.io/">Klaus Greff</a><sup>3</sup>  
                            <a target="_blank" rel="noopener noreferrer" href="https://msajjadi.com/">Mehdi S. M. Sajjadi</a><sup>3</sup><sup>*</sup>
                        </p>

                        <!-- Affiliation -->
                        <p class="is-size-6 text-center"><sup>1</sup>MPI IS   <sup>2</sup>Google Research   <sup>3</sup>Google DeepMind</p>
                        <!-- Correspondence -->
                        <p class="is-size-7 text-center">
                        <sup>*</sup>Correspondence: <a href = "mailto: maximilian.seitzer@tuebingen.mpg.de,dyst@msajjadi.com">maximilian.seitzer@tuebingen.mpg.de</a>, <a href = "mailto: maximilian.seitzer@tuebingen.mpg.de,dyst@msajjadi.com">dyst@msajjadi.com</a>
                        </p>
                        <br/>
                        <a target="_blank" rel="noopener noreferrer" href="">
                          <button class="button is-link is-light is-responsive">Paper</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;
  Handlebars.registerHelper("eq", (a, b) => a == b);

  const fileName = location.href.split("/").slice(-1)[0].replace(".html", "");
  const rel_path = () => {
    if (fileName === "index") {
      return ".";
    } else {
      return "..";
    }
  };

  _fillTemplate({
    templateContent: content,
    dstId: "header",
    data: {
      sections: [
        { path: "pca_msn", name: "PCA (MSN)" },
        { path: "pca_sv", name: "PCA (SV)" },
        { path: "vids_msn", name: "Videos (MSN)" },
        { path: "vids_sv", name: "Videos (SV)" },
        { path: "vids_msn_ablation", name: "Videos - ablation (MSN)" },
        { path: "vids_gnerf", name: "Videos (GNeRF)" },
      ],
      curr_page: fileName,
      rel_path: rel_path,
    },
  });
}

function _wrapReady(fn) {
  return function (...args) {
    $(document).ready(() => fn(...args));
  };
}

const makeHeader = _wrapReady(_makeHeader);
const fillTemplate = _wrapReady(_fillTemplate);

makeHeader(); // Create the header
