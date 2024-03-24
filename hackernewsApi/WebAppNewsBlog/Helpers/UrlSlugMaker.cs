using System.Text.RegularExpressions;

namespace WebAppNewsBlog.Helpers
{
    public static class UrlSlugMaker
    {
        public static string GenerateSlug(string text)
        {

            text = Regex.Replace(text, @"[^a-zA-Z0-9]+", " ").Trim();

            text = text.Replace(" ", "-");

            text = text.ToLowerInvariant();

            return text;
        }
    }
}
