{
  description = "oakland-house — buyer-side listing diligence pipeline";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems =
        f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = with pkgs; [
            bun        # package manager + script runner for the workspace
            nodejs_22  # fallback runner (validate.mjs is plain node-compatible)
            ffmpeg     # photo downscaling (Section 6 of the pipeline)
            curl       # fetching listing pages
            jq         # JSON poking
            python3    # JSON-LD / __INITIAL_DATA__ extraction snippets
            file       # image validation
          ];

          shellHook = ''
            # Red prompt showing the project folder name (nix develop's bash).
            project_name=$(basename "$PWD")
            export PS1="\[\e[1;31m\]($project_name) \w \$ \[\e[0m\]"
            unset project_name

            echo "oakland-house dev shell"
            echo "  bun  $(bun --version)   node $(node --version)"
            echo "  deps: bun install   validate: bun run validate listings/<slug>/listing.json"
          '';
        };
      });
    };
}
