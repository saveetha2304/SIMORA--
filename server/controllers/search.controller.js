const supabase = require("../config/supabase");

// Rule-based search: NOT AI, pure keyword/price extraction
const searchController = async (req, res) => {
  try {
    const rawQuery = (req.query.q || "").trim();

    if (!rawQuery) {
      return res.status(400).json({ error: "Search query missing" });
    }

    let text = rawQuery.toLowerCase();

    // 1. Extract price range: "under 2000", "below 1500", "above 500"
    let maxPrice = null;
    let minPrice = null;

    const underMatch = text.match(/(?:under|below|less than)\s*(\d+)/);
    const aboveMatch = text.match(/(?:above|over|more than)\s*(\d+)/);
    const betweenMatch = text.match(/between\s*(\d+)\s*(?:and|to)\s*(\d+)/);

    if (betweenMatch) {
      minPrice = parseFloat(betweenMatch[1]);
      maxPrice = parseFloat(betweenMatch[2]);
      text = text.replace(betweenMatch[0], "");
    } else if (underMatch) {
      maxPrice = parseFloat(underMatch[1]);
      text = text.replace(underMatch[0], "");
    } else if (aboveMatch) {
      minPrice = parseFloat(aboveMatch[1]);
      text = text.replace(aboveMatch[0], "");
    }

    // 2. Fetch categories to check if query mentions a category name
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("id, name");

    if (catError) throw catError;

    let matchedCategoryId = null;
    for (const cat of categories) {
      if (text.includes(cat.name.toLowerCase())) {
        matchedCategoryId = cat.id;
        text = text.replace(cat.name.toLowerCase(), "");
        break;
      }
    }

    // 3. Remaining text = product name / keyword search
    const remainingKeyword = text.trim();

    // 4. Build Supabase query
    let queryBuilder = supabase.from("products").select("*");

    if (matchedCategoryId) {
      queryBuilder = queryBuilder.eq("category_id", matchedCategoryId);
    }

    if (remainingKeyword) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${remainingKeyword}%,description.ilike.%${remainingKeyword}%`
      );
    }

    if (minPrice !== null) {
      queryBuilder = queryBuilder.gte("price", minPrice);
    }

    if (maxPrice !== null) {
      queryBuilder = queryBuilder.lte("price", maxPrice);
    }

    const { data: products, error } = await queryBuilder;

    if (error) throw error;

    return res.status(200).json({ products });
  } catch (error) {
    console.error("Search Controller Error:", error);
    return res.status(500).json({ error: "Search failed" });
  }
};

module.exports = { searchController };