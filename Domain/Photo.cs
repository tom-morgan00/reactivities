using System;
using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string PublicId { get; set; }
    public required string Url { get; set; }
    public required string UserId { get; set; }
}
