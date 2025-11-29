import type { APIRoute } from "astro";
import { html } from "satori-html";
import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import path from "path";
import serviceDetails from "../../data/serviceDetails.json";

export function getStaticPaths() {
  return serviceDetails.map((service) => ({
    params: { slug: service.slug },
  }));
}

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  const service = serviceDetails.find((s) => s.slug === slug);

  if (!service) return new Response("Not found", { status: 404 });

  // Image Mapping (Copied from [slug].astro to ensure consistency)
  const tourImages: Record<string, string> = {
    "tirupati-package": "/images/temple/Tirupati-Balaji.jpg",
    "thiruvannamalai-girivalam-trip": "/images/temple/Thiruvannamalai-Girivalam.jpg",
    "rameswaram-2-days": "/images/temple/Rameswaram.jpg",
    "navagraha-tour": "/images/temple/Navagraha.jpg",
    "kanchipuram-temple-trip": "/images/temple/Kanchipuram-Temple.jpg",
    "chidambaram-temple-trip": "/images/temple/Chidambaram-Natarajar-Temple.jpg",
    "sabarimala-trip": "/images/temple/Sabarimala-Temple.jpg",
    "pondicherry-one-day-trip": "https://images.pexels.com/photos/32009229/pexels-photo-32009229.jpeg?auto=compress&cs=tinysrgb&w=800",
    "vellore-golden-temple": "/images/temple/Vellore-Golden.jpg",
    "mahabalipuram-ecr-temple-route": "/images/temple/Mahabalipuram-ECR-Temples.jpg",
    "one-day-chennai-city-tour": "/images/temple/chennai-city.jpg" 
  };

  const categoryImages: Record<string, string> = {
    "Acting Driver Services": "/images/services/acting-drivers.jpg",
    "Corporate Travel": "/images/services/corporate.jpg",
    "Airport Transfers": "/images/services/airport-transfer.jpg",
    "Temple Tours": "/images/services/temple-tours.jpg",
    "Premium Fleet Rental": "/images/services/corporate.jpg"
  };

  const heroImage = tourImages[service.slug] || categoryImages[service.category] || '/images/logo.png';
  
  // Handle full URLs vs local paths
  let imageBuffer: Buffer | string = "";
  
  if (heroImage.startsWith('http')) {
      imageBuffer = heroImage;
  } else {
      // Read local file
      try {
          const imagePath = path.resolve(`./public${heroImage}`);
          const fileBuffer = readFileSync(imagePath);
          
          // Convert to JPEG using sharp to ensure compatibility (especially for AVIF)
          const jpegBuffer = await sharp(fileBuffer)
            .resize({ width: 1200, fit: 'inside', withoutEnlargement: true }) 
            .jpeg({ quality: 80 })
            .toBuffer();

          imageBuffer = `data:image/jpeg;base64,${jpegBuffer.toString('base64')}`;
      } catch (e) {
          console.error(`Failed to load image: ${heroImage}`, e);
          // Fallback or empty
          imageBuffer = ""; 
      }
  }

  // Load Font
  const fontPath = path.resolve("./public/fonts/NotoSans-Bold.ttf");
  const fontData = readFileSync(fontPath);

  const htmlString = `
    <div style="display: flex; height: 100%; width: 100%; background-color: #fff; position: relative;">
      ${imageBuffer ? `<img src="${imageBuffer}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.4;" />` : ''}
      
      <div style="display: flex; flex-direction: column; justify-content: center; padding: 80px; width: 100%; height: 100%;">
        <div style="display: flex; align-items: center; margin-bottom: 40px;">
           <span style="font-size: 30px; color: #dc2626; font-weight: bold; background: white; padding: 10px 20px; border-radius: 50px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Kalidass Travels</span>
        </div>

        <h1 style="display: flex; font-size: 70px; font-weight: bold; color: #000; margin: 0; line-height: 1.1; text-shadow: 2px 2px 0px #fff; max-width: 90%;">
          ${service.title}
        </h1>

        <div style="display: flex; margin-top: 30px;">
           <span style="font-size: 35px; color: #fff; background-color: #dc2626; padding: 15px 30px; border-radius: 15px; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
             ${service.category === 'Temple Tours' ? 'Pilgrimage Special' : 'Premium Service'}
           </span>
        </div>
      </div>
      
      <div style="display: flex; position: absolute; bottom: 0; left: 0; width: 100%; height: 20px; background: #dc2626;"></div>
    </div>
  `;

  const markup = html(htmlString);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Noto Sans",
        data: fontData,
        style: "normal",
        weight: 700,
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png as any, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
