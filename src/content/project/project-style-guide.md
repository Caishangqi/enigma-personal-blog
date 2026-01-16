---
# ===========================================
# Project Frontmatter Schema
# ===========================================

# Required fields
title: 'Minecraft Shader Engine'           # Project title
pubDate: 'Jun 19 2024'                     # Publication date (supports various formats)

# Optional metadata
description: 'This is a very long description that exceeds 180 characters. We need to test that the truncation works correctly and adds ellipsis at the end. The description should be cut off at exactly 180 characters and then show three dots to indicate there is more content available.'
updatedDate: 'Aug 19 2024'                 # Last update date

# Images
heroImage: '../../assets/images/project/project_style_guild/kila-banner.png'        # Main banner (16:9 recommended)
iconImage: '../../assets/images/project/project_style_guild/kila-icon.png'   # Small icon (square, for card display)

# Categorization
category: 'Group Project'                  # Options: "Group Project", "Personal", "Open Source", etc.
categoryColor: '#ff6464'                   # Category badge color (hex)
tags:                                      # Tech stack tags (displayed on card)
  - C++
  - OpenGL
  - GLSL

# External links (1-4 supported)
links:
  - name: Github                           # Link display name
    url: https://github.com/example/shader-engine
  - name: Steam
    url: https://store.steampowered.com/app/123456
  - name: Documentation
    url: https://docs.example.com
---

A high-performance shader engine for Minecraft featuring real-time ray tracing, volumetric lighting, and PBR materials support.

## Features

- Real-time ray tracing with hardware acceleration
- Volumetric fog and lighting effects
- Physically Based Rendering (PBR) materials
- Dynamic shadows with soft edges
- Screen-space reflections

## Video Demo

<figure class="kg-card kg-embed-card kg-card-hascaption">
  <div class="iframe-wrap" style="padding-bottom: 56.25%">
    <iframe width="200" height="113" src="https://www.youtube.com/embed/jnOqC-TLhaU?feature=oembed" style="border: 0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="Shader Demo"></iframe>
  </div>
  <figcaption>Shader Engine Demo Video</figcaption>
</figure>

## Technical Details

### Architecture

The engine uses a deferred rendering pipeline with the following stages:

1. **Geometry Pass** - Renders scene geometry to G-buffer
2. **Lighting Pass** - Calculates lighting from G-buffer data
3. **Post-processing** - Applies effects like bloom, tone mapping

### Code Example

```cpp
// Initialize the shader pipeline
ShaderPipeline pipeline;
pipeline.addStage(new GeometryPass());
pipeline.addStage(new LightingPass());
pipeline.addStage(new PostProcessPass());

// Render frame
pipeline.execute(scene, camera);
```

## Screenshots

![Shader comparison](../../assets/blog-placeholder-about.jpg)
*Before and after shader comparison*

## Performance

| Resolution | FPS (RTX 3080) | FPS (RTX 4090) |
| ---------- | -------------- | -------------- |
| 1080p      | 120+           | 144+           |
| 1440p      | 90+            | 144+           |
| 4K         | 60+            | 100+           |

## Getting Started

1. Clone the repository
2. Install dependencies with `cmake`
3. Build the project
4. Run the demo application

> **Note**: Requires a GPU with ray tracing support for full features.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
