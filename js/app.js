// Pencil2D MCP Interactive Application Logic

const TOOLS_DATA = [
  {
    name: "pencil2d_inspect",
    category: "inspection",
    badge: "Inspect",
    desc: "Inspect a .pclx project file to retrieve canvas dimensions, framerate (FPS), total keyframes, layer hierarchy, and color palette.",
    params: "project_path: string (required)"
  },
  {
    name: "pencil2d_create",
    category: "creation",
    badge: "Create",
    desc: "Programmatically generate a new valid .pclx project file with customized canvas resolution, framerate, and initial raster/camera layers.",
    params: "project_path: string, width?: int, height?: int, fps?: int, layer_names?: string[]"
  },
  {
    name: "pencil2d_add_frame",
    category: "keyframing",
    badge: "Keyframe",
    desc: "Insert or update an individual animation keyframe on any bitmap layer from an image file path or raw base64 data.",
    params: "project_path: string, frame: int, image_path?: string, base64_data?: string, layer_name?: string"
  },
  {
    name: "pencil2d_add_frames_batch",
    category: "keyframing",
    badge: "Batch",
    desc: "Bulk import dozens or hundreds of frames from a directory or structured JSON array with automatic layer creation.",
    params: "project_path: string, frames?: array, directory_path?: string, layer_name?: string, start_frame?: int, auto_create_layers?: bool"
  },
  {
    name: "pencil2d_add_layer",
    category: "layers",
    badge: "Layers",
    desc: "Dynamically add a new layer to the timeline: Bitmap (1), Vector (2), Sound (4), or Camera (5).",
    params: "project_path: string, name: string, layer_type?: string, visible?: bool"
  },
  {
    name: "pencil2d_remove_layer",
    category: "layers",
    badge: "Layers",
    desc: "Safely remove an unwanted layer and all associated keyframes from the project by name or ID.",
    params: "project_path: string, layer_name_or_id: string"
  },
  {
    name: "pencil2d_add_audio",
    category: "media",
    badge: "Audio",
    desc: "Attach dialogue, music, or sound effects (WAV/MP3) to a sound layer synchronized to a specific frame number.",
    params: "project_path: string, audio_path: string, frame?: int, layer_name?: string"
  },
  {
    name: "pencil2d_set_camera",
    category: "media",
    badge: "Camera",
    desc: "Program camera keyframe motion: smooth panning (dx, dy), zoom scale (s), and rotation angles across the timeline.",
    params: "project_path: string, frame?: int, dx?: float, dy?: float, scale?: float, rotation?: float"
  },
  {
    name: "pencil2d_manage_palette",
    category: "creation",
    badge: "Palette",
    desc: "Add or update custom RGB/RGBA color swatches directly into the project's embedded palette.xml file.",
    params: "project_path: string, color_name: string, red: int, green: int, blue: int, alpha?: int"
  },
  {
    name: "pencil2d_create_spritesheet",
    category: "rendering",
    badge: "Sprites",
    desc: "Automatically pack timeline animation frames into a game-ready spritesheet PNG with coordinate grid metadata.",
    params: "project_path: string, output_image: string, layer_name?: string, columns?: int"
  },
  {
    name: "pencil2d_validate",
    category: "inspection",
    badge: "Health",
    desc: "Deep project integrity validator that verifies ZIP integrity, XML doctypes, asset references, and frame continuity.",
    params: "project_path: string"
  },
  {
    name: "pencil2d_extract_frames",
    category: "rendering",
    badge: "Export",
    desc: "Unpack all individual layer frames into PNG image sequences on disk for AI inspection or external editing.",
    params: "project_path: string, output_dir: string"
  },
  {
    name: "pencil2d_export",
    category: "rendering",
    badge: "Render",
    desc: "Headlessly render project animations to MP4 (H.264), animated GIF, or PNG sequences via AppImage CLI or built-in pure-Python fallback.",
    params: "project_path: string, output_path: string, width?: int, height?: int, fps?: int, force_pure_python?: bool"
  },
  {
    name: "pencil2d_launch_gui",
    category: "media",
    badge: "GUI",
    desc: "Launch the project in the visual Pencil2D GUI on your desktop for interactive human-in-the-loop pair drawing.",
    params: "project_path?: string"
  },
  {
    name: "pencil2d_look",
    category: "inspection",
    badge: "Vision",
    desc: "Generate multi-frame contact sheet filmstrips or sampled frames with onion skinning so AI agents visually verify their animation.",
    params: "project_path: string, mode?: 'strip'|'frame', frames?: int[], frame_count?: int, onion_skin?: bool, output_path?: string"
  },
  {
    name: "pencil2d_generate_animation",
    category: "creation",
    badge: "Presets",
    desc: "Procedurally author complete animations using authentic artistic styles (stickman, anime, pencil_sketch, ghibli, doodle) with kinematic physics.",
    params: "project_path: string, style: string, action?: string, frame_count?: int, fps?: int, width?: int, height?: int"
  },
  {
    name: "pencil2d_get_guide",
    category: "inspection",
    badge: "Guide",
    desc: "Retrieve domain craft guides on 12 animation principles, style formulas, tapered Bezier strokes, and line-of-action kinematics.",
    params: "topic: 'animation' | 'styles' | 'drawing_techniques'"
  }
];

const CONFIG_SNIPPETS = {
  claude: `{
  "mcpServers": {
    "pencil2d": {
      "command": "pencil2d-mcp",
      "args": ["serve"],
      "env": {
        "PENCIL2D_APPIMAGE": "/path/to/pencil2d-linux-amd64-v0.7.2.AppImage"
      }
    }
  }
}`,
  antigravity: `{
  "mcpServers": {
    "pencil2d": {
      "command": "pencil2d-mcp",
      "args": ["serve"],
      "env": {
        "DISPLAY": ":0.0",
        "PENCIL2D_APPIMAGE": "/path/to/pencil2d-linux-amd64-v0.7.2.AppImage"
      }
    }
  }
}`,
  cursor: `{
  "mcpServers": {
    "pencil2d": {
      "command": "pencil2d-mcp",
      "args": ["serve"]
    }
  }
}`,
  python: `from pencil2d_mcp import Pencil2DProject, export_project, render_animation
from PIL import Image, ImageDraw

# Create 800x600 project with layers via factory method
project = Pencil2DProject.create("ball.pclx", width=800, height=600, fps=12, layer_names=["Background", "Character"])

# Programmatically draw frames
for frame_idx in range(1, 13):
    img = Image.new("RGBA", (800, 600), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([100 + frame_idx*40, 300, 160 + frame_idx*40, 360], fill=(230, 60, 60, 255))
    project.add_frame_image("Character", frame_idx, img)

# Save .pclx and validate integrity
project.save("ball.pclx")
print("Validation:", project.validate()["status"])

# Export GIF directly via pure-Python compositor (zero AppImage dependency)
project.export_gif("ball.gif", fps=12)

# Or render to MP4 via AppImage CLI / FFmpeg
export_project("ball.pclx", "ball.mp4", fps=12)`
};

document.addEventListener("DOMContentLoaded", () => {
  renderTools("all");
  setupFilters();
  setupConfigTabs();
});

function renderTools(filterCategory) {
  const container = document.getElementById("tools-container");
  if (!container) return;

  const filtered = filterCategory === "all" 
    ? TOOLS_DATA 
    : TOOLS_DATA.filter(t => t.category === filterCategory);

  container.innerHTML = filtered.map(tool => `
    <div class="tool-card">
      <div>
        <div class="tool-header">
          <div class="tool-name">${tool.name}</div>
          <span class="tool-badge">${tool.badge}</span>
        </div>
        <p class="tool-desc">${tool.desc}</p>
      </div>
      <div class="tool-params">
        <span>Parameters:</span><br>${tool.params}
      </div>
    </div>
  `).join("");
}

function setupFilters() {
  const btns = document.querySelectorAll(".filter-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderTools(category);
    });
  });
}

function setupConfigTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const codeElem = document.getElementById("config-code-content");
  const pathLabel = document.getElementById("config-path-label");

  const pathMap = {
    claude: "claude_desktop_config.json",
    antigravity: "~/.gemini/config/mcp_config.json",
    cursor: ".cursor/mcp.json",
    python: "main.py"
  };

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-tab");
      if (codeElem && CONFIG_SNIPPETS[target]) {
        codeElem.textContent = CONFIG_SNIPPETS[target];
      }
      if (pathLabel && pathMap[target]) {
        pathLabel.textContent = pathMap[target];
      }
    });
  });
}

function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = buttonElement.innerHTML;
    buttonElement.innerHTML = `✓ Copied!`;
    setTimeout(() => {
      buttonElement.innerHTML = originalText;
    }, 2000);
  });
}

function copyConfigSnippet(buttonElement) {
  const codeElem = document.getElementById("config-code-content");
  if (codeElem) {
    copyToClipboard(codeElem.textContent, buttonElement);
  }
}
