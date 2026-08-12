import { useState } from "react";
import { generateImage } from "../services/imageGenerationService";

function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image description.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await generateImage(prompt);

      if (!result?.success || !result?.image?.base64) {
        throw new Error("Image generation failed");
      }

      const imageUrl =
        `data:${result.image.mimeType};base64,${result.image.base64}`;

      setImage(imageUrl);

    } catch (err) {
      console.log("IMAGE GENERATION ERROR:", err);

      setError(
        err?.response?.data?.message ||
        "Unable to generate image. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!image) return;

    const link = document.createElement("a");

    link.href = image;
    link.download = "ai-generated-image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
              ✨
            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold">
                AI Image Generator
              </h1>

              <p className="text-white/80 mt-2">
                Turn your ideas into images using AI.
              </p>

            </div>

          </div>

        </div>


        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-8">


          {/* Prompt Section */}

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Describe Your Image
            </h2>

            <p className="text-gray-500 mb-5">
              Tell AI what you want to create.
            </p>


            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setError("");
              }}
              placeholder="Example: A futuristic software developer working in a modern AI laboratory, cinematic lighting, realistic..."
              className="w-full h-48 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-gray-700"
            />


            {/* Example Prompts */}

            <div className="mt-4">

              <p className="text-sm font-semibold text-gray-600 mb-2">
                Try an example:
              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  "A futuristic AI developer workspace",
                  "Modern professional developer portrait",
                  "Cyberpunk city with artificial intelligence",
                ].map((example) => (

                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-sm transition"
                  >
                    {example}
                  </button>

                ))}

              </div>

            </div>


            {/* Error */}

            {error && (

              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
                ⚠️ {error}
              </div>

            )}


            {/* Generate Button */}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg transition shadow-lg"
            >

              {loading
                ? "✨ Generating..."
                : "✨ Generate Image"}

            </button>

          </div>


          {/* Image Preview */}

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Generated Image
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Your AI-generated result
                </p>

              </div>

            </div>


            <div className="min-h-[420px] bg-slate-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">

              {loading ? (

                <div className="text-center">

                  <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-5"></div>

                  <p className="font-semibold text-gray-700">
                    Creating your image...
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    This may take a few moments.
                  </p>

                </div>

              ) : image ? (

                <img
                  src={image}
                  alt="AI Generated"
                  className="w-full h-full object-contain"
                />

              ) : (

                <div className="text-center px-6">

                  <div className="text-7xl mb-5">
                    🖼️
                  </div>

                  <h3 className="text-xl font-bold text-gray-700">
                    No Image Yet
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Enter a prompt and click Generate Image.
                  </p>

                </div>

              )}

            </div>


            {/* Actions */}

            {image && !loading && (

              <div className="flex gap-3 mt-5">

                <button
                  onClick={handleGenerate}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  🔄 Generate Again
                </button>

                <button
                  onClick={handleDownload}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition"
                >
                  ⬇️ Download
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIImageGenerator;